import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddComment = () => {
    const { bookId } = useParams(); // Obține ID-ul cărții din URL
    const [content, setContent] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setErrorMessage("You must be logged in to add a comment.");
                return;
            }

            try {
                const res = await axios.get("http://localhost:8081/auth/verify-token", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 200) {
                    setIsLoggedIn(true);
                } else {
                    setErrorMessage("You must be logged in to add a comment.");
                }
            } catch (error) {
                console.error("Error verifying login status:", error);
                setErrorMessage("You must be logged in to add a comment.");
            }
        };

        checkLoginStatus();
    }, []);

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            alert("Content cannot be empty.");
            return;
        }

        if (!isLoggedIn) {
            setErrorMessage("You must be logged in to add a comment.");
            return;
        }

        const token = localStorage.getItem("accessToken");

        try {
            const response = await axios.post(
                "http://localhost:8081/comments",
                { book_id: bookId, content: content.trim() }, // Folosim bookId din useParams
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                alert("Comment added successfully!");
                navigate(`/books/${bookId}`); // Redirecționare către ShowBook
            } else {
                setErrorMessage("Failed to add comment.");
            }
        } catch (error) {
            console.error("Error adding comment: ", error);
            setErrorMessage("An error occurred while adding the comment.");
        }
    };

    if (errorMessage) {
        return <h1>{errorMessage}</h1>;
    }

    return (
        <div className="login-container">
            <h1>Add a Comment</h1>
            <form className="login-form">
                <textarea
                    placeholder="Write your comment here..."
                    onChange={handleChange}
                    value={content}
                    rows="5"
                    style={{ resize: "none" }}
                ></textarea>
                <div className="l_button" onClick={handleClick}>
                    Add Comment
                </div>
            </form>
        </div>
    );
};

export default AddComment;
