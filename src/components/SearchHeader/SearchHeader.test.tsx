import { render, screen } from '@testing-library/react';
import { Route, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchHeader from './SearchHeader';
import { createWithMemoryRouter } from '../../tests/utils';

describe('SearchHeader', () => {
  it('renders correctly', () => {
    const router = createWithMemoryRouter(
      <Route path='/' element={<SearchHeader />} />
    );

    render(<RouterProvider router={router} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();

    const linkHeading = screen.getByRole('heading', {
      name: 'Youtube',
      level: 1,
    });
    expect(linkHeading).toBeInTheDocument();

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();

    const searchButtonElement = screen.getByRole('button');
    expect(searchButtonElement).toBeInTheDocument();
  });

  it('renders the correct keyword to the input element', () => {
    const router = createWithMemoryRouter(
      <Route path='/:keyword' element={<SearchHeader />} />,
      ['/react']
    );

    render(<RouterProvider router={router} />);

    const inputElement = screen.getByDisplayValue('react');
    expect(inputElement).toBeInTheDocument();
  });

  it('navigate to results page when search button is clicked', async () => {
    userEvent.setup();

    const searchKeyword = 'fake-keyword';
    const router = createWithMemoryRouter(
      <>
        <Route path='/' element={<SearchHeader />} />
        <Route
          path={`/videos/:${searchKeyword}`}
          element={<p>{`Search result is ${searchKeyword}`}</p>}
        />
      </>
    );

    render(<RouterProvider router={router} />);

    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, searchKeyword);

    const searchButtonElement = screen.getByRole('button');
    await userEvent.click(searchButtonElement);

    const paragraphElement = screen.getByText(
      `Search result is ${searchKeyword}`
    );
    expect(paragraphElement).toBeInTheDocument();
  });
});

export {};
