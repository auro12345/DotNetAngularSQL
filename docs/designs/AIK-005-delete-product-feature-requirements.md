# Requirement: Delete a product

**Ticket**: AIK-005 (local story; Jira not configured)
**Status**: Draft
**Analyzed**: 2026-11-02

## Summary

Allow users to delete a persisted product through a confirmed Angular action. The API must return 204 for successful deletion and 404 for an unknown product while preserving all existing product operations.

## Functional Requirements

- FR1: Add DELETE /api/Products/{id} through the thin API controller, application service, and repository abstraction.
- FR2: Remove the product through Entity Framework Core and save the database change.
- FR3: Return 204 after deletion and 404 when the product does not exist.
- FR4: Add a Delete button beside Edit and confirm with the product name before calling the API.
- FR5: Canceling confirmation sends no request and leaves the UI unchanged.
- FR6: Successful deletion removes the row, updates summary cards, and displays success feedback.
- FR7: In-progress deletion disables duplicate requests for that product.
- FR8: Failed deletion keeps the product visible and displays an error message.

## Non-Functional Requirements

- NFR1: Preserve SQL Server persistence and Clean Architecture boundaries.
- NFR2: Keep HTTP calls in Angular ProductService.
- NFR3: Maintain responsive layout at narrow widths.
- NFR4: Use only existing dependencies and no schema migration.

## Acceptance Criteria

- [ ] **AIK-005-AC-1**: Given a product exists, when the user clicks Delete, then confirmation identifies the product before an API request is sent.
- [ ] **AIK-005-AC-2**: Given the prompt is open, when the user cancels, then no request is sent and the product remains unchanged.
- [ ] **AIK-005-AC-3**: Given the user confirms, when deletion succeeds, then SQL Server data and the product row are removed.
- [ ] **AIK-005-AC-4**: Given a product is deleted, then product count and inventory value update correctly.
- [ ] **AIK-005-AC-5**: Given a valid ID, when DELETE succeeds, then the endpoint returns 204 after SaveChanges.
- [ ] **AIK-005-AC-6**: Given a nonexistent ID, when DELETE is called, then the endpoint returns 404.
- [ ] **AIK-005-AC-7**: Given deletion fails, then the product remains visible and an error message is shown.
- [ ] **AIK-005-AC-8**: Given deletion is in progress, then duplicate requests for that product are prevented.
- [ ] **AIK-005-AC-9**: Given a narrow viewport, then Delete remains beside Edit without breaking layout.
- [ ] **AIK-005-AC-10**: Given existing operations are tested or built, then GET, POST, and PUT continue to work.
- [ ] **AIK-005-AC-11**: Given automated test infrastructure exists, then success, missing-product, cancellation, UI removal, and API failure behavior are covered.

## Traceability Matrix

| AC ID | AC Summary | Test File | Status |
|---|---|---|---|
| AIK-005-AC-1 | Confirmation identifies product | Angular component/service test | Pending |
| AIK-005-AC-2 | Cancellation sends no request | Angular component test | Pending |
| AIK-005-AC-3 | Confirmed deletion persists and updates UI | Angular/API tests | Pending |
| AIK-005-AC-4 | Summary totals update | Angular component test | Pending |
| AIK-005-AC-5 | DELETE success returns 204 | Backend test | Pending |
| AIK-005-AC-6 | Missing DELETE returns 404 | Backend test | Pending |
| AIK-005-AC-7 | Deletion failure preserves row | Angular component test | Pending |
| AIK-005-AC-8 | Duplicate deletion is blocked | Angular component test | Pending |
| AIK-005-AC-9 | Responsive row actions | Build/CSS review | Pending |
| AIK-005-AC-10 | Existing CRUD regressions | Existing suite/build | Pending |
| AIK-005-AC-11 | Required automated coverage | Test files | Pending |

## Out of Scope

- Bulk or soft deletion, archiving, recycle bin, schema migration, database recreation, and unrelated CRUD changes.

## Dependencies

- Existing SQL Server EF Core DbContext and SqlProductRepository.
- Existing IProductService, IProductRepository, Angular standalone component, and ProductService.
