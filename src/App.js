import React, { Component, Fragment } from "react";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  {
    allCourses {
      id
      title
      author
    }
  }
`;

const MUTATION = gql`
  mutation Course($title: String!, $author: String!, $topic: String!) {
    addCourse(title: $title, author: $author, topic: $topic) {
      id
      title
      author
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Fragment>
        <Query query={QUERY}>
          {({ data, error, loading }) => {
            if (error) return <p>Error...</p>;
            if (loading) return <p>Loading...</p>;
            return data.allCourses.map(course => (
              <div key={course.id}>
                <h1>{course.title}</h1>
              </div>
            ));
          }}
        </Query>
        <Mutation mutation={MUTATION}>
          {(addCourse, { data }) => (
            <button
              onClick={() => {
                addCourse({
                  variables: {
                    title: "Aprendendo a aprender",
                    author: "Abacaxi",
                    topic: "Marataízes"
                  }
                });
              }}
            >
              Inserir
            </button>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

export default App;
