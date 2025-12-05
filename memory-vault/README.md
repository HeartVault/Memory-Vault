# Memory Vault Mobile App

Mobile application for Memory Vault built with React Native and Expo.

## Architecture

This mobile app follows **Clean Architecture** principles with clear separation between UI and business logic. The architecture mirrors the web app structure for consistency.

### Key Principles

- **UI is totally separated from logic**: All business logic lives in domain and application layers
- **Feature-based organization**: Each feature is self-contained with its own components and hooks
- **Layer independence**: Domain layer has no dependencies on external frameworks
- **Reusable patterns**: Shared utilities, hooks, and components are easily accessible

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed architecture documentation.

## Project Structure

```
memory-vault/
├── app/                    # Expo Router file-based routing
├── src/
│   ├── application/        # Use cases and business workflows
│   ├── domain/            # Core business logic and entities
│   ├── infrastructure/    # API, storage, external services
│   ├── features/          # Feature modules (UI components)
│   ├── architecture/      # Cross-cutting concerns
│   ├── components/        # Shared UI components
│   ├── hooks/            # Shared React hooks
│   ├── constants/        # Constants and mock data
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript types
├── assets/               # Images, fonts, etc.
└── docs/                 # Documentation
```

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Open the app

   - Press `i` to open iOS simulator
   - Press `a` to open Android emulator
   - Scan QR code with Expo Go app on your device

## Development

### Adding a New Feature

1. Create feature directory: `src/features/[feature-name]/`
2. Add components: `src/features/[feature-name]/components/`
3. Add hooks (if needed): `src/features/[feature-name]/hooks/`
4. Export from feature: `src/features/[feature-name]/index.ts`
5. Create screen in `app/` directory (Expo Router)

### Adding Business Logic

1. **Domain Entity**: `src/domain/entities/[Entity].ts`
2. **Repository Interface**: `src/domain/repositories/I[Entity]Repository.ts`
3. **Use Case**: `src/application/use-cases/[Action][Entity]UseCase.ts`
4. **Repository Adapter**: `src/infrastructure/adapters/[Entity]RepositoryAdapter.ts`
5. **Use in Feature**: Import use case in your component

### Import Paths

Use the `@/src/` alias for clean imports:

```typescript
import { Memory } from '@/src/domain/entities';
import { CreateMemoryUseCase } from '@/src/application/use-cases';
import { MemoryList } from '@/src/features/memories';
```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)
- [Architecture Documentation](./docs/ARCHITECTURE.md)
