import { TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { ProductManagement } from './product-management';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

describe('ProductManagement delete behavior', () => {
  const laptop: Product = { id: 1, name: 'Laptop', description: 'Work laptop', price: 50000, category: 'Electronics' };
  let deleteMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    deleteMock = vi.fn();
    await TestBed.configureTestingModule({
      imports: [ProductManagement],
      providers: [{
        provide: ProductService,
        useValue: {
          getAll: vi.fn(() => of([])),
          create: vi.fn(),
          update: vi.fn(),
          delete: deleteMock,
        },
      }],
    }).compileComponents();
  });

  afterEach(() => vi.restoreAllMocks());

  it('does not delete when confirmation is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const fixture = TestBed.createComponent(ProductManagement);
    fixture.componentInstance.products = [laptop];

    fixture.componentInstance.deleteProduct(laptop);

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete "Laptop"?');
    expect(deleteMock).not.toHaveBeenCalled();
    expect(fixture.componentInstance.products).toContain(laptop);
  });

  it('removes the product and updates totals after confirmed success', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    deleteMock.mockReturnValue(of(undefined));
    const fixture = TestBed.createComponent(ProductManagement);
    fixture.componentInstance.products = [laptop];

    fixture.componentInstance.deleteProduct(laptop);

    expect(deleteMock).toHaveBeenCalledWith(1);
    expect(fixture.componentInstance.products).toEqual([]);
    expect(fixture.componentInstance.productsTotal()).toBe(0);
    expect(fixture.componentInstance.successMessage).toContain('deleted successfully');
  });

  it('keeps the product and shows an error when deletion fails', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    deleteMock.mockReturnValue(throwError(() => new Error('API failure')));
    const fixture = TestBed.createComponent(ProductManagement);
    fixture.componentInstance.products = [laptop];

    fixture.componentInstance.deleteProduct(laptop);

    expect(fixture.componentInstance.products).toContain(laptop);
    expect(fixture.componentInstance.errorMessage).toContain('Could not delete');
  });

  it('prevents duplicate deletion requests for the same product while in progress', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    deleteMock.mockReturnValue(new Subject<void>());
    const fixture = TestBed.createComponent(ProductManagement);

    fixture.componentInstance.deleteProduct(laptop);
    fixture.componentInstance.deleteProduct(laptop);

    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.isDeleting(1)).toBe(true);
  });
});
