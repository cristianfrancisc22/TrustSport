import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { clubsLiga1, clubsLiga2, clubsLaLiga, clubsPremierLeague } from '../constants/Clubs';
import Cookies from "universal-cookie";
import { Container } from '@chakra-ui/react';

export default function CreatePost() {
  const cookies = new Cookies();
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [clubs, setClubs] = useState([]);
  const [league, setLeague] = useState('');
  const [club, setClub] = useState('');
  const [postType, setPostType] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Update clubs based on selected league
    switch (league) {
      case 'LIGA 1':
        setClubs(clubsLiga1);
        break;
      case 'LIGA 2':
        setClubs(clubsLiga2);
        break;
      case 'La Liga':
        setClubs(clubsLaLiga);
        break;
      case 'Premier League':
        setClubs(clubsPremierLeague);
        break;
      default:
        setClubs([]);
        break;
    }
  }, [league]);

  const handleLeagueChange = (e) => {
    setLeague(e.target.value);
    setClub(''); // Reset club selection when league changes
  };

  const handleClubChange = (e) => {
    setClub(e.target.value);
  };

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEditorChange = (content) => {
    setText(content);
  };

  const handleSubmit = async () => {
    // Retrieve JWT token from cookies
    const jwtToken = cookies.get("jwt_authorization")

    if (!jwtToken) {
      console.error('JWT token not found. User is not authenticated.');
      // Handle the scenario where the user is not authenticated
      return;
    }

    // Prepare the data to be sent in the request body
    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('sportType', 'FOTBAL'); // Assuming 'sport' in the backend corresponds to 'league' here
    formData.append('championship', league); // You may need to handle championship data if available
    formData.append('team', club); // Assuming 'team' in the backend corresponds to 'club' here
    formData.append('player', ''); // You may need to handle player data if available
    formData.append('postType', postType);
    formData.append('image', image);

    try {
      // Make the fetch request with authorization header
      const response = await fetch('http://localhost:8080/api/v1/post/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}` // Include JWT token in the Authorization header
        },
        body: formData
      });

      // Check if the request was successful
      if (response.ok) {
        console.log('Post created successfully');
        // Optionally, you can redirect the user or perform other actions after successful creation
      } else {
        console.error('Failed to create post');
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle network errors or other exceptions
    }
  };

  return (
    <Container className=" mt-12 pt-10">
      <div>
        <div className="p-1"> 
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="p-1 pt-2">
          <label htmlFor="league">Select League:</label>
          <select id="league" value={league} onChange={handleLeagueChange}>
            <option value="">Select League</option>
            <option value="LIGA 1">Liga 1</option>
            <option value="LIGA 2">Liga 2</option>
            <option value="La Liga">La Liga</option>
            <option value="Premier League">Premier League</option>
          </select>
        </div>
        {league && (
          <div className="p-1 pt-2">
            <label htmlFor="club">Select Club:</label>
            <select id="club" value={club} onChange={handleClubChange}>
              <option value="">Select Club</option>
              {clubs.map((club, index) => (
                <option key={club.id} value={club.name}>{club.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="p-1 pt-2">
          <label htmlFor="postType">Select Post Type:</label>
          <select id="postType" value={postType} onChange={handlePostTypeChange}>
            <option value="">Select Post Type</option>
            <option value="EDITORIAL">Editorial</option>
            <option value="NEWS">News</option>
            <option value="INTERVIEW">Interview</option>
          </select>
        </div>
        <div className="p-1 pt-2 mb-2">
          <label htmlFor="image"> Add Image:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <Editor
          apiKey='8opw52id14odwok9q7188f6az2v6de2f31qc1pr3nxu5487c'
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
          onEditorChange={handleEditorChange}
        />
        <button className="mt-4" onClick={handleSubmit}>Submit</button>
      </div>
    </Container>
  );
}
