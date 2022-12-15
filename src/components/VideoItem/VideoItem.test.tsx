import { render, screen } from '@testing-library/react';
import { Route, RouterProvider, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import VideoItem from './VideoItem';
import { createWithMemoryRouter } from '../../tests/utils';
import { timeAgo } from '../../utils/timeAgo';
import { fakeVideo as video } from '../../tests/videoData';

const { publishedAt, title, thumbnails, channelTitle } = video.snippet;

describe('VideoItem', () => {
  it('renders correctly', () => {
    render(
      createWithMemoryRouter(
        <Route path='/' element={<VideoItem video={video} />} />
      )
    );

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', thumbnails.medium.url);
    expect(imgElement).toHaveAttribute('alt', title);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const channelTitleElement = screen.getByText(channelTitle);
    expect(channelTitleElement).toBeInTheDocument();

    const publishElement = screen.getByText(timeAgo(publishedAt));
    expect(publishElement).toBeInTheDocument();
  });

  it('renders list type correctly', () => {
    render(
      createWithMemoryRouter(
        <Route path='/' element={<VideoItem video={video} type='list' />} />
      )
    );

    const videoItemElement = screen.getByRole('listitem');
    expect(videoItemElement).toHaveClass('flex gap-2 mb-2', { exact: false });

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', thumbnails.medium.url);
    expect(imgElement).toHaveAttribute('alt', title);
    expect(imgElement).toHaveClass('w-40', { exact: false });

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('text-sm', { exact: false });

    const channelTitleElement = screen.getByText(channelTitle);
    expect(channelTitleElement).toBeInTheDocument();
    expect(channelTitleElement).toHaveClass('text-xs', { exact: false });

    const publishElement = screen.getByText(timeAgo(publishedAt));
    expect(publishElement).toBeInTheDocument();
    expect(publishElement).toHaveClass('text-xs', { exact: false });
  });

  it('navigate to detail page with video state when clicked', async () => {
    userEvent.setup();

    // useLocation으로 전달된 state를 보여주는 테스트용 Component
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }

    render(
      createWithMemoryRouter(
        <>
          <Route path='/' element={<VideoItem video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );

    const videoItemElement = screen.getByRole('listitem');
    await userEvent.click(videoItemElement);

    const videoStateFromLocation = screen.getByText(JSON.stringify(video));
    expect(videoStateFromLocation).toBeInTheDocument();
  });
});

export {};
