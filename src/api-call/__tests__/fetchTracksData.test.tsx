import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node'
import { rest } from 'msw';
import data from '../../data/mock-data/tracksData';
import { Provider } from 'react-redux';
import { store } from '../../data/store';
import TracksContainer from '../../components/Tracks/container';

/**
 * Register API mock with return
 * mock data pokemon color
 */
const server = setupServer(
    rest.get(`https://api.spotify.com/v1/search?q=test&type=track&access_token=accessToken`, (req, res, ctx) => {
        return res(ctx.json(data));
    }),
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should successfully fetch data and show pokemon colors', async () => {
    const { name, artists, isSelected, uri, id, album } = data;
    render(<Provider store={store}>
        <TracksContainer
            name={name}
            artists={artists}
            isSelected={isSelected}
            uri={uri}
            id={id}
            imgSrc={album.images[1].url}
            album={album.name}
            handleSelectTrack={() => {
                isSelected === false;
            }} />
    </Provider>);


    /**
     * Waiting async process using waitFor
     * until data is fetched from server
     * and rendered in the DOM.
     */
    const testid = screen.queryByTestId(/id .*/i);
    await waitFor(() => {
        return expect(testid).toBeInTheDocument();
    });
})
