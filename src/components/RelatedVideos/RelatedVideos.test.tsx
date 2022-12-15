import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { createWithContext, createWithMemoryRouter } from '../../tests/utils';
import { fakeVideos } from '../../tests/videoData';
import RelatedVideos from './RelatedVideos';

describe('RelatedVideos', () => {
  const testYoutubeApi = {
    search: jest.fn(),
    searchByKeyword: jest.fn(),
    searchByCategoryId: jest.fn(),
    mostPopular: jest.fn(),
    channelDetail: jest.fn(),
    relatedVideos: jest.fn(),
  };

  it('renders correctly', async () => {
    testYoutubeApi.relatedVideos.mockResolvedValue(fakeVideos);

    render(
      createWithContext(
        createWithMemoryRouter(
          <Route path='/' element={<RelatedVideos id='id' />} />
        ),
        testYoutubeApi
      )
    );

    await waitFor(() => {
      const listElement = screen.getByRole('list');
      expect(listElement).toBeInTheDocument();

      const listItemElements = screen.getAllByRole('listitem');
      expect(listItemElements).toHaveLength(fakeVideos.length);
    });
  });

  it('renders loading', () => {
    testYoutubeApi.relatedVideos.mockResolvedValue(fakeVideos);

    render(
      createWithContext(
        createWithMemoryRouter(
          <Route path='/' element={<RelatedVideos id='id' />} />
        ),
        testYoutubeApi
      )
    );

    const loadingElement = screen.getByTestId('loading-sppiner');
    expect(loadingElement).toBeInTheDocument();
  });

  it('render error', async () => {
    testYoutubeApi.relatedVideos.mockImplementation(() => {
      throw new Error('error');
    });

    render(
      createWithContext(
        createWithMemoryRouter(
          <Route path='/' element={<RelatedVideos id='id' />} />
        ),
        testYoutubeApi
      )
    );

    await waitFor(() => {
      const errorElement = screen.getByText('Something is wrong');
      expect(errorElement).toBeInTheDocument();
    });
  });
});

export {};
