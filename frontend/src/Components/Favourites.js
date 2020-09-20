import React, { Component } from "react";
import { Button, Card } from "react-bootstrap"; // necessary to make display cards for the results

export default class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: " ",
      isLoaded: false,
      deletes: [],
      // state records the undesired objects to be deleted.
      // sent to server after submission
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    // binding functions to use them properly
  }
  componentDidMount() {
    console.log("componentDidMount");
    fetch("/favourites")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            message: JSON.parse(result.message),
            // recieves and changes the message data to be used later
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
  handleRemove = (object) => {
    this.state.deletes.push(object);
    // function adds the object to th deletes list in the state.
  };
  handleSubmit(e) {
    alert("An item was submitted:");
    fetch("/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: this.state.deletes }), // the body has the deletes so the server knows what to delete.
    })
      .then((res) => res.json())
      .then((response) => alert("Success:", JSON.stringify(response)))
      .catch((error) => console.log("Error:", error));
  }
  render() {
    const { error, message, isLoaded } = this.state;
    // called the state data for the looping through the results
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div>
          <h3>Favourites</h3>
          <p>These are all your favourite items</p>
          <Button onClick={this.handleSubmit}>Update Favourites</Button>
          <br />
          {message.favourites.map((item) => {
            // each type of object has a unique display for it and is sorted.
            if (item.wrapperType == "track" || item.kind == "song") {
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
                      <Button
                        onClick={() => {
                          this.handleRemove(item);
                        }}
                      >
                        Remove Favourite
                      </Button>
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
                      <Card.Title>Artist: {item.artistName}</Card.Title>
                      <Card.Text className="cardText">
                        Movie Name: {item.trackName}
                      </Card.Text>
                      <Card.Text className="cardText">
                        Collection: {item.collectionName}
                      </Card.Text>
                    </div>
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
