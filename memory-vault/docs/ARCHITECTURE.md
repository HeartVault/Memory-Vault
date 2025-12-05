# Mobile App Architecture Guide

This document explains the architecture of the Memory Vault mobile application. The project follows **Clean Architecture** principles, ensuring separation of concerns, testability, and maintainability. The architecture mirrors the web app structure for consistency.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Directory Structure](#directory-structure)
3. [Layer Details](#layer-details)
4. [Data Flow](#data-flow)
5. [Best Practices](#best-practices)

## Architecture Overview

The application is organized into four main layers:

```
┌─────────────────────────────────────┐
│   Presentation (Features/App)       │  ← React Native components, screens
├─────────────────────────────────────┤
│   Application (Use Cases)           │  ← Business logic orchestration
├─────────────────────────────────────┤
│   Domain (Business Logic)           │  ← Core entities, rules
├─────────────────────────────────────┤
│   Infrastructure (External)         │  ← API, storage, adapters
└─────────────────────────────────────┘
```

**Dependency Rule**: Inner layers (Domain) should never depend on outer layers. Dependencies flow inward:
- Features → Application → Domain
- Infrastructure → Domain (implements domain interfaces)

## Directory Structure

```
memory-vault/
├── app/                              # Expo Router file-based routing
│   ├── _layout.tsx                   # Root layout
│   └── (tabs)/                       # Tab navigation group
│       ├── _layout.tsx
│       ├── index.tsx                 # Home screen
│       └── explore.tsx               # Explore screen
├── src/
│   ├── application/                  # Application layer (use cases)
│   │   ├── use-cases/
│   │   ├── services/
│   │   ├── dto/
│   │   └── mappers/
│   ├── domain/                       # Domain layer (business logic)
│   │   ├── entities/
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── value-objects/
│   │   └── types/
│   ├── infrastructure/               # Infrastructure layer (external)
│   │   ├── api/
│   │   ├── storage/
│   │   ├── auth/
│   │   ├── config/
│   │   └── adapters/
│   ├── features/                     # Feature modules
│   │   └── [feature-name]/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── index.ts
│   ├── architecture/                 # Cross-cutting concerns
│   │   ├── hooks/
│   │   ├── providers/
│   │   ├── patterns/
│   │   └── middleware/
│   ├── components/                   # Shared components
│   ├── hooks/                        # Shared hooks
│   ├── constants/                    # Constants and mocks
│   ├── lib/                          # Library utilities
│   └── types/                        # Shared TypeScript types
├── assets/                           # Images, fonts, etc.
├── constants/                        # Legacy constants (to be migrated)
└── components/                       # Legacy components (to be migrated)
```

## Layer Details

### 1. Domain Layer (`src/domain/`)

**Purpose**: Contains the core business logic, entities, and rules. This layer is framework-agnostic and has no dependencies on external libraries.

**Structure**:
- `entities/` - Domain entities (core business objects)
- `repositories/` - Repository interfaces (contracts, not implementations)
- `services/` - Domain services (business logic)
- `value-objects/` - Immutable value objects
- `types/` - Domain-specific types and interfaces

### 2. Application Layer (`src/application/`)

**Purpose**: Implements domain logic through use cases. Orchestrates domain entities and coordinates with repositories.

**Structure**:
- `use-cases/` - Use cases / interactors (business workflows)
- `services/` - Application services (coordination logic)
- `dto/` - Data Transfer Objects (for layer communication)
- `mappers/` - Mappers between domain entities and DTOs

### 3. Infrastructure Layer (`src/infrastructure/`)

**Purpose**: Implements external concerns and adapters. Contains all the "plumbing" - API clients, storage, database implementations, etc.

**Structure**:
- `api/` - API client and HTTP utilities
- `storage/` - Storage utilities (AsyncStorage, SecureStore)
- `auth/` - Authentication client and token management
- `config/` - Configuration and environment variables
- `adapters/` - Adapters implementing domain repository interfaces

### 4. Presentation Layer (`src/features/` + `app/`)

**Purpose**: UI components, screens, and feature modules. This is where React Native components live.

**Structure**:
- `src/features/[feature-name]/` - Feature modules
  - `components/` - Feature-specific components
  - `hooks/` - Feature-specific hooks
  - `index.ts` - Feature exports
- `app/` - Expo Router file-based routing
- `src/components/` - Shared components across features
- `src/hooks/` - Shared hooks across features
- `src/architecture/` - Cross-cutting presentation concerns

## Data Flow

### Creating a Memory (Example)

1. **User interacts with UI** (`src/features/memories/components/CreateMemoryForm.tsx`)
2. **Use case orchestrates** (`src/application/use-cases/CreateMemoryUseCase.ts`)
3. **Domain entity validates** (`src/domain/entities/Memory.ts`)
4. **Repository adapter implements** (`src/infrastructure/adapters/MemoryRepositoryAdapter.ts`)
5. **API client makes request** (`src/infrastructure/api/`)

## Best Practices

### 1. Dependency Direction
- ✅ Domain → Nothing (no dependencies)
- ✅ Application → Domain only
- ✅ Infrastructure → Domain (implements interfaces)
- ✅ Features → Application + Domain (via use cases)

### 2. Where to Put Code

| What | Where |
|------|-------|
| Business entity (User, Memory) | `src/domain/entities/` |
| Business rule validation | `src/domain/entities/` or `src/domain/services/` |
| Repository interface | `src/domain/repositories/` |
| Use case (CreateMemory) | `src/application/use-cases/` |
| API call | `src/infrastructure/api/` |
| Repository implementation | `src/infrastructure/adapters/` |
| React Native component | `src/features/[feature]/components/` or `src/components/` |
| Shared component | `src/components/` |
| Feature-specific hook | `src/features/[feature]/hooks/` |
| Shared hook | `src/hooks/` |
| Context provider | `src/architecture/providers/` |
| Type definition | `src/domain/types/` or `src/types/` |

### 3. Naming Conventions

- **Entities**: PascalCase, singular (`Memory`, `User`)
- **Repositories**: `I[Entity]Repository` for interfaces, `[Entity]RepositoryAdapter` for implementations
- **Use Cases**: `[Action][Entity]UseCase` (`CreateMemoryUseCase`, `GetMemoriesUseCase`)
- **DTOs**: `[Action][Entity]DTO` (`CreateMemoryDTO`, `UpdateMemoryDTO`)
- **Components**: PascalCase (`MemoryList`, `CreateMemoryForm`)
- **Hooks**: camelCase with `use` prefix (`useMemories`, `useCreateMemory`)

### 4. Import Paths

Use the path aliases configured in `tsconfig.json`:
```typescript
import { Memory } from '@/src/domain/entities';
import { CreateMemoryUseCase } from '@/src/application/use-cases';
import { memoryRepository } from '@/src/infrastructure/adapters';
```

## Summary

- **Domain**: Pure business logic, no dependencies
- **Application**: Use cases that orchestrate domain logic
- **Infrastructure**: External implementations (API, storage, adapters)
- **Features**: UI components that use application layer

Always follow the dependency rule: dependencies point inward. This ensures your business logic remains testable and independent of frameworks and external services.

