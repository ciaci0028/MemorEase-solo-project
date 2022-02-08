function UploadPage () {
    return (
        <>
            <p>Upload New Photo Here</p>
            <form>
                <input
                    placeholder="Image URL"
                    >
                </input>
                <br/>
                <input
                    placeholder="Tags"
                >
                </input>
                <br/>
                <input
                    placeholder="Date"
                >
                </input>
                <br/>
                <button>
                    Upload
                </button>
            </form>
        </>
    )
};

export default UploadPage;