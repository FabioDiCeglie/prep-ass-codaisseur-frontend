// This selector returns only if the object is there
export const selectStoryComments = (reduxState) =>
  reduxState.story.space
    ? reduxState.story.space.stories.map((story) => ({
        comments: story.comments,
        storyId: story.id,
      }))
    : null;
