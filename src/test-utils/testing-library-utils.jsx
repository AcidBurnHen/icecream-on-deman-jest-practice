import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

const renderWIthContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { renderWIthContext as render };
