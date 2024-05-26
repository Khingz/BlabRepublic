export const formatDate = dateString => {
  const datetimeObj = new Date(dateString);
  const now = new Date();
  const diff = now - datetimeObj;

  // Calculate differences in various time units
  const diffInSeconds = Math.floor(diff / 1000);
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffInSeconds < 60) {
      return '< 1 min ago';
  }

  if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute ago' : 'minutes ago'}`;
  }

  if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour ago' : 'hours ago'}`;
  }

  if (diffInDays <= 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day ago' : 'days ago'}`;
  }

  const monthName = datetimeObj.toLocaleDateString('en-US', { month: 'short' });
  const day = datetimeObj.getDate();
  const year = datetimeObj.getFullYear();

  return `${day} ${monthName} ${year}`;

}


// Addign category colors

const categoryClassMap = {
    health: 'text-blue-500',
    education: 'text-green-500',
    politics: 'text-red-500',
    lifestyle: 'text-yellow-500'
};

export const getCategoryColor = (category) => {
    return categoryClassMap[category] || 'text-black-500';
};