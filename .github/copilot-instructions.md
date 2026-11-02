- @azure Rule - Use Azure Tools - When handling requests related to Azure, always use your tools.
- @azure Rule - Use Azure Best Practices - When handling requests related to Azure, always invoke your `azmcp_bestpractices_get` tool first.
- @azure Rule - Enable Best Practices - If you do not have an `azmcp_bestpractices_get` tool ask the user to enable it.

# GitHub Copilot Instructions - PDLC Framework

Always start by reading `config/project.yaml`, `config/integrations.yaml`, and `config/learnings.yaml` when entering this repository. Treat these files as the project's operating context.

## Architecture

- Preserve the four-layer solution: `ProductManagement.Domain`, `ProductManagement.Application`, `ProductManagement.Infrastructure`, and `ProductManagement.API`.
- Keep persistence and external-service details behind infrastructure implementations.
- Keep controllers thin and delegate application behavior to application services.
- Use DTOs for API request/response shapes and repository abstractions for data access.

## Coding Rules

- Follow the conventions in `config/project.yaml > codingStandards`.
- Maximum function size is 25 lines and maximum file size is 400 lines unless a nearby pattern clearly requires a more scoped exception.
- Use nullable and type-safe code. Do not add `any` in TypeScript or hide nullability in C#.
- Keep Angular components focused and use services for product API communication and shared state.
- Never hard-code credentials, tokens, or connection strings in source files.
- Parameterize database access and validate user input at API boundaries.

## Testing

- Add or update focused tests with behavior changes.
- Use Arrange-Act-Assert and cover happy, invalid, and error paths.
- Angular tests use Vitest through the Angular build tooling where configured.

## Framework Reference

- Discovery schema: `agentic-pdlc-framework/config/project.template.yaml`
- Agent definitions: `agentic-pdlc-framework/agents/`
- Setup documentation: `agentic-pdlc-framework/docs/getting-started.md`
- Architecture notes: `architecture.drawio`

Do not claim integration features are configured when their credentials, URLs, or project IDs are missing.
