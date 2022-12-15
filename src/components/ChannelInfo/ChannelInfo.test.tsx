import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { createWithContext, createWithMemoryRouter } from '../../tests/utils';
import ChannelInfo from './ChannelInfo';

describe('ChannelInfo', () => {
  const testYoutubeApi = {
    search: jest.fn(),
    searchByKeyword: jest.fn(),
    searchByCategoryId: jest.fn(),
    mostPopular: jest.fn(),
    channelDetail: jest.fn(),
    relatedVideos: jest.fn(),
  };

  it('renders correctly', async () => {
    testYoutubeApi.channelDetail.mockResolvedValue({
      snippet: {
        thumbnails: {
          medium: {
            url: 'imgURL',
          },
        },
      },
    });

    render(
      createWithContext(
        createWithMemoryRouter(
          <Route
            path='/'
            element={<ChannelInfo id='id' title='channelTitle' />}
          />
        ),
        testYoutubeApi
      )
    );

    await waitFor(() => {
      const imgElement = screen.getByRole('img');
      expect(imgElement).toHaveAttribute('src', 'imgURL');
      expect(imgElement).toHaveAttribute('alt', 'channelTitle');

      const titleElement = screen.getByText('channelTitle');
      expect(titleElement).toBeInTheDocument();
    });
  });
});

export {};
