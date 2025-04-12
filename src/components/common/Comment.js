export const groupByUser = (comments) => {
    const groups = {};
  
    comments.forEach(comment => {
      const userId = comment.user._id;
  
      if (!groups[userId]) {
        groups[userId] = [];
      }
  
      groups[userId].push(comment);
    });
  
    // Sort each group by createdAt (latest first)
    return Object.values(groups).map(group =>
      group.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  };
  