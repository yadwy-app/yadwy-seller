# Branded Design Guidelines

This document outlines the standard design patterns and components for the Yadwy Seller Dashboard to ensure a consistent, premium, and branded experience.

## Colors
We use a refined color palette based on OKLCH color space for better perceptional uniformity.
- **Primary**: Slate/Neutral Black for strong actions and text.
- **Muted**: Subtle grays for backgrounds and secondary text.
- **Destructive**: Clear red for dangerous actions.
- **Backgrounds**: Light gray (Shopify-style) for page background, Pure White for cards.

## Components

### Buttons
- **Primary Page Actions**: Use `size="sm"` for top-right page actions (e.g., "Create Order", "Add Product").
  ```tsx
  <Button size="sm">
      <Plus className="w-4 h-4 mr-2" />
      Create Order
  </Button>
  ```

### Data Tables
Tables should strictly follow this structure for consistency.
- **Container**: Wrap tables in a Card-like container with `bg-card rounded-lg border border-border overflow-hidden`.
- **Header**: Use a specific style for the table header row:
  ```tsx
  <TableRow className="hover:bg-muted/50 bg-muted/50 border-b border-border h-9">
      <TableHead className="font-medium text-muted-foreground text-xs py-2">Column</TableHead>
  </TableRow>
  ```
- **Rows**: Add hover effect to interactive rows: `hover:bg-muted/50`.
- **Cell Text**:
  - Primary identifier: `font-medium text-foreground hover:underline`
  - Secondary info: `text-muted-foreground text-sm` or `text-xs`

### Status Badges
Always use the `StatusBadge` component which handles standardized colors for orders and products.
```tsx
<StatusBadge status="DELIVERED" type="fulfillment" />
```

## Typography
- **Headers**: Clean, bold headings.
- **Body**: standard sans-serif stack.
- **Sizes**: Use `text-sm` for standard table content, `text-xs` for secondary metadata.
