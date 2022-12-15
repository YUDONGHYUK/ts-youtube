import { render, screen } from '@testing-library/react';
import { Route, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchHeader from './SearchHeader';
import { createWithMemoryRouter } from '../../tests/utils';

describe('SearchHeader', () => {
  it('renders correctly', () => {
    render(
      createWithMemoryRouter(<Route path='/' element={<SearchHeader />} />)
    );

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
    render(
      createWithMemoryRouter(
        <Route path='/:keyword' element={<SearchHeader />} />,
        ['/react']
      )
    );

    const inputElement = screen.getByDisplayValue('react');
    expect(inputElement).toBeInTheDocument();
  });

  it('navigate to results page when search button is clicked', async () => {
    userEvent.setup();

    const searchKeyword = 'fake-keyword';

    render(
      createWithMemoryRouter(
        <>
          <Route path='/' element={<SearchHeader />} />
          <Route
            path={`/videos/:${searchKeyword}`}
            element={<p>{`Search result is ${searchKeyword}`}</p>}
          />
        </>
      )
    );

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
