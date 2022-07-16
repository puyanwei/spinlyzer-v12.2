import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
// import Home from '../pages/index';

describe('Homepage', () => {
  it('renders the page', () => {
    render(<Home />);
    expect(screen.queryAllByTestId('homepage')).toBeVisible();
  });
});
