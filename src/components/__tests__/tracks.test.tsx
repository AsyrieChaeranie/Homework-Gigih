import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import data from '../../../data/mock-data/tracksData';
import { store } from '../../../data/store';
import TracksContainer from '../container';

test('Should show tracks component', () => {
    const { name, artists, isSelected, uri, id, album } = data;
    const { container } = render(
        <Provider store={store}>
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
    expect(container).toBeInTheDocument();

    const testid = screen.queryByTestId(/id .*/i);
    expect(testid).toBeInTheDocument();

}) 