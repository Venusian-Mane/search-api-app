import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: " ",
      // meassage state recieves the data from the servr to display
      isLoaded: false,
      favourites: [],
      // state records favourite items to send to server
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddFav = this.handleAddFav.bind(this);
    // binding functions for proper funnctionality and avoiding errors
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch("/results")
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          this.setState({
            message: JSON.parse(result.message),
            // recieve the data from the server and loads the message state used to display it later
            isLoaded: true,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            error,
          });
        }
      );
  }
  handleAddFav = (object) => {
    this.state.favourites.push(object);
    console.log(this.state.favourites);
  };

  handleSubmit(e) {
    alert("An item was submitted:");
    fetch("/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: this.state.favourites }),
    })
      .then((res) => res.json())
      .then((response) => alert("Success:", JSON.stringify(response)))
      .catch((error) => console.log("Error:", error));
  }

  render() {
    const { error, message, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>; // loading will be shown while the data is still being fetched
    } else {
      return (
        <div>
          <h1>Search Results</h1>
          <p>Here are the results from your search</p>
          <Button onClick={this.handleSubmit}>Submit Favourites</Button>
          {/* Submitting will confirm the decision to dd to the favourites.json file and will be displayed in the favourites component */}
          <br />
          {message.results.map((item) => {
            // for each of these results a specific and unqiue card is made for each media type
            // each media type but software will display artwork and have discriptions
            if (item.kind == "song") {
              return (
                <Card className="resultCard">
                  <Card.Body>
                    <div>
                      <Card.Img
                        className="cardImage"
                        variant="top"
                        src={item.artworkUrl100}
                      />
                      <Card.Title>Artist: {item.artistName}</Card.Title>
                      <Card.Text className="cardText">
                        {item.wrapperType} name: {item.trackName}
                      </Card.Text>
                      <Card.Text className="cardText">
                        Album: {item.collectionName}
                      </Card.Text>
                      <button
                        className="addFavButton"
                        type="button"
                        onClick={() => {
                          this.handleAddFav(item);
                        }}
                      >
                        <small>+Favourites</small>
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              );
            } else if (item.wrapperType == "collection") {
              return (
                <Card className="resultCard">
                  <Card.Body>
                    <div>
                      <Card.Img
                        className="cardImage"
                        variant="top"
                        src={item.artworkUrl100}
                      />
                      <Card.Title>Artist: {item.artistName}</Card.Title>
                      <Card.Text className="cardText">
                        Album: {item.collectionName}
                      </Card.Text>
                    </div>
                    <Button
                      onClick={this.handleAddFav}
                      className="btn btn-outline-success btn-sm"
                    >
                      <small>+Favourites</small>
                    </Button>
                  </Card.Body>
                </Card>
              );
            } else if (item.wrapperType == "audiobook") {
              return (
                <Card className="resultCard">
                  <Card.Body>
                    <div>
                      <Card.Img
                        className="cardImage"
                        variant="top"
                        src={item.artworkUrl100}
                      />
                      <Card.Title>Artist: {item.artistName}</Card.Title>
                      <Card.Text className="cardText">
                        Collection: {item.collectionName}
                      </Card.Text>
                    </div>
                    <Button
                      onClick={this.handleAddFav}
                      className="btn btn-outline-success btn-sm"
                    >
                      <small>+Favourites</small>
                    </Button>
                  </Card.Body>
                </Card>
              );
            } else if (item.kind == "feature-movie") {
              return (
                <Card className="resultCard">
                  <Card.Body>
                    <div>
                      <Card.Img
                        className="cardImage"
                        variant="top"
                        src={item.artworkUrl100}
                      />
                      <Card.Title>Director: {item.artistName}</Card.Title>
                      <Card.Text className="cardText">
                        Movie Name: {item.trackName}
                      </Card.Text>
                      <Card.Text className="cardText">
                        Year: {item.releaseDate.split("-")[0]}
                      </Card.Text>
                    </div>
                    <Button
                      onClick={this.handleAddFav}
                      className="btn btn-outline-success btn-sm"
                    >
                      <small>+Favourites</small>
                    </Button>
                  </Card.Body>
                </Card>
              );
            } else if (item.kind == "podcast") {
              return (
                <Card className="resultCard">
                  <Card.Body>
                    <div>
                      <Card.Img
                        className="cardImage"
                        variant="top"
                        src={item.artworkUrl100}
                      />
                      <Card.Title>Artist: {item.artistName}</Card.Title>
                      <Card.Text className="cardText">
                        Podcast name: {item.trackName}
                      </Card.Text>
                      <Card.Text className="cardText">
                        Collection: {item.collectionName}
                      </Card.Text>
                    </div>
                    <Button
                      onClick={this.handleAddFav}
                      className="btn btn-outline-success btn-sm"
                    >
                      <small>+Favourites</small>
                    </Button>
                  </Card.Body>
                </Card>
              );
            } else if (item.kind == "music-video") {
              return (
                <Card className="resultCard">
                  <Card.Body>
                    <div>
                      <Card.Img
                        className="cardImage"
                        variant="top"
                        src={item.artworkUrl100}
                      />
                      <Card.Title>Artist: {item.artistName}</Card.Title>
                      <Card.Text className="cardText">
                        Music Video name: {item.trackName}
                      </Card.Text>
                      <Card.Text className="cardText">
                        Collection: {item.collectionName}
                      </Card.Text>
                    </div>
                    <Button
                      onClick={this.handleAddFav}
                      className="btn btn-outline-success btn-sm"
                    >
                      <small>+Favourites</small>
                    </Button>
                  </Card.Body>
                </Card>
              );
            } else if (item.kind == "tv-episode") {
              return (
                <Card className="resultCard">
                  <Card.Body>
                    <div>
                      <Card.Img
                        className="cardImage"
                        variant="top"
                        src={item.artworkUrl100}
                      />
                      <Card.Title>Show Name: {item.artistName}</Card.Title>
                      <Card.Text className="cardText">
                        Episode name: {item.trackName}
                      </Card.Text>
                      <Card.Text className="cardText">
                        Collection: {item.collectionName}
                      </Card.Text>
                    </div>
                    <Button
                      onClick={this.handleAddFav}
                      className="btn btn-outline-success btn-sm"
                    >
                      <small>+Favourites</small>
                    </Button>
                  </Card.Body>
                </Card>
              );
            }
          })}
        </div>
      );
    }
  }
}
