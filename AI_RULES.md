# AI Rules

## Tech Stack
- React paired with React Router to keep navigation centralized in `src/App.tsx`.
- TypeScript everywhere for safer, more predictable code.
- Tailwind CSS for all layout, spacing, and styling via utility classes.
- `shadcn/ui` components for accessible, prebuilt UI pieces that maintain design consistency.
- `lucide-react` for icons to keep the visual language cohesive.
- The Puter AI script for on-demand image generation hooks into the UI.
- Toast/notification components (from `shadcn/ui`) for messaging the user about progress or errors.

## Library Rules
- Use `shadcn/ui` components whenever you need a ready-made UI pattern instead of reinventing it.
- Rely on Tailwind CSS classes rather than adding other styling systems.
- Whenever you need icons, grab them from `lucide-react`—don’t introduce another icon library.
- Wrap important user actions in toasts using the `shadcn/ui` toast utilities so users always get feedback.
- Keep all pages under `src/pages/` and components under `src/components/`, and always create a new file for each new component.
- Respect the existing React Router setup in `src/App.tsx`; add new routes there and make sure `Index.tsx` reflects the latest components.
- Avoid adding new dependency-heavy libraries without prior discussion; stick to this stack for UI, styles, and notifications.