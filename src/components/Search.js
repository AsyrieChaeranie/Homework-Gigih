import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const SearchForm = ({ onSubmit, onChange }) => {
    return (
        <div className="song" >
            <h2> Search Song</h2>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} />
                <br></br>
                <br></br>
                <Button type="submit" value="Submit" variant="contained" color="primary" startIcon={<SearchIcon />}> SEARCH </Button>
            </form>
        </div>
    )
}

export default SearchForm;