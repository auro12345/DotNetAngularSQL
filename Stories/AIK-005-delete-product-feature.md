# AIK-005: Delete a product

  -----------------------------------------------------------------------
  Field                               Value
  ----------------------------------- -----------------------------------
  **Key**                             AIK-005 (proposed; not created in
                                      Jira)

  **Type**                            Story

  **Epic**                            AI Kata

  **Priority**                        TBD

  **Story points**                    TBD

  **Status**                          Draft

  **Labels**                          `product-management`, `delete`,
                                      `api`, `angular`, `sql-server`
  -----------------------------------------------------------------------

## User story

As a user managing products, I want to delete a product after confirming
the action so that unwanted products are removed from the database and
the UI.

## Context

The Product Management application uses ASP.NET Core 8, Clean
Architecture, Angular 22, and SQL Server. Add deletion by following the
existing project structure and conventions. Persist deletion in SQL
Server; do not use or reintroduce an in-memory repository for product
persistence.

## Scope

**In** - Add `DELETE /api/Products/{id}` to `ProductManagement.API`. -
Implement deletion through the Application service and repository
abstractions. - Delete the record from SQL Server using the existing
Entity Framework Core configuration. - Add a **Delete** button beside
**Edit** for every product row in Angular. - Ask for confirmation before
sending the delete request. - On successful deletion, update the product
list, total count, and total inventory value. - Display success/error
feedback and handle in-progress states. - Add or update automated tests
if test infrastructure exists.

**Out** - Bulk deletion, soft deletion, archiving, or a recycle bin. -
Changes to unrelated product features. - Changes to Clean Architecture
boundaries or replacement of SQL Server persistence.

## Implementation requirements

### API and Application layers

-   Add a controller action for `DELETE /api/Products/{id}`.
-   Return `204 No Content` when deletion succeeds and `404 Not Found`
    when the product ID does not exist.
-   Add the required delete operation to `IProductService` and implement
    it in `ProductService`.
-   Add the required delete operation to `IProductRepository` and
    implement it in the Infrastructure repository.
-   Keep the controller thin; do not place database access or business
    logic in it.
-   Preserve existing GET, POST, and PUT behavior.

### Infrastructure and database

-   Use the existing EF Core `DbContext` and SQL Server configuration.
-   Persist deletion using the appropriate EF Core operation and save
    changes.
-   Do not use `InMemoryProductRepository`, `StaticProductData`, or an
    in-memory collection if the application is configured for SQL
    Server.
-   Do not create a database or change connection strings unless
    required by the existing configuration.
-   Do not add a migration unless the delete feature requires a schema
    change; deleting a record normally does not require one.

### Angular UI / HTML

-   Update `product-management.html` to place a **Delete** button
    immediately beside **Edit** in each product row.
-   Follow existing styles and add only necessary CSS for a
    destructive/delete button. Keep the layout responsive.
-   On click, show a confirmation prompt that identifies the product,
    such as `Are you sure you want to delete "Laptop"?`.
-   If the user cancels, do not call the API or change the UI.
-   If the user confirms, call the delete method in the existing Angular
    `ProductService`; keep HTTP calls in the service rather than the
    component.
-   On success, remove the product from the list (or reload the list),
    recalculate summary cards, and display a success message.
-   While deletion is in progress, prevent duplicate delete requests for
    that product and show a suitable in-progress state.
-   If deletion fails, keep the product visible and show a useful error
    message.
-   Follow the existing Angular standalone component, template, and
    service structure. Do not introduce `@Input()` / `@Output()`
    communication or an unrelated state-management library.

## Acceptance criteria

-   [ ] **Given** a product exists, **when** the user clicks Delete,
    **then** a confirmation prompt identifies the product before an API
    request is sent.
-   [ ] **Given** the prompt is open, **when** the user cancels,
    **then** no API request is sent and the product remains unchanged.
-   [ ] **Given** the user confirms, **when** deletion succeeds,
    **then** the record is deleted from SQL Server and disappears from
    the UI.
-   [ ] **Given** a product is deleted, **then** the total product count
    and inventory value update correctly.
-   [ ] **Given** a valid product ID, **when** the DELETE endpoint
    succeeds, **then** it returns `204 No Content` after the database
    change is saved.
-   [ ] **Given** a nonexistent product ID, **when** the DELETE endpoint
    is called, **then** it returns `404 Not Found`.
-   [ ] **Given** deletion fails, **then** the product remains visible
    and the UI displays an error message.
-   [ ] **Given** deletion is in progress, **then** duplicate requests
    for that product are prevented.
-   [ ] **Given** the table is displayed on a narrow viewport, **then**
    Delete appears beside Edit without breaking the layout.
-   [ ] **Given** the feature is implemented, **then** existing GET,
    POST, and PUT behavior continues to work.
-   [ ] **Given** automated test infrastructure exists, **then** tests
    cover successful deletion, missing products, confirmation
    cancellation, UI removal, and API failure handling.

## Assessment focus

-   Clean Architecture responsibilities and dependency flow.
-   Correct HTTP status codes and API contract.
-   SQL Server persistence rather than transient in-memory storage.
-   Confirmation and cancellation behavior.
-   UI state consistency, feedback, and error handling.
-   Regression coverage for existing product operations.

## Dependencies

-   Existing Product Management API and Angular product list.
-   Existing SQL Server database, EF Core `DbContext`, and repository
    configuration.
-   Existing `IProductService`, `IProductRepository`, and Angular
    `ProductService`.
