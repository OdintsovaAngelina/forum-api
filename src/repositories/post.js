const posts = [
  {
    id: 1,
    title: 'Джава скрипт для чайников',
    content: 'Я и есть этот чайничек',
    author: 'Этобылая',
    category: 'код',
  },
  {
    id: 2,
    title: 'Зразы',
    content: 'Очень хочу их',
    author: 'Геля',
    category: 'еда',
  },
  {
    id: 3,
    title: 'Диана не бей',
    content: 'Домашка',
    author: 'Ангелина',
    category: 'домашка ночью',
  },
  {
    id: 4,
    title: 'Поездка в другую страну',
    content: 'Впечетления от поездок',
    author: 'Галька',
    category: 'путешествие',
  },
  {
    id: 5,
    title: 'Новые штучки',
    content: 'Что-то новоеее',
    author: 'Хана',
    category: 'штучки',
  },
];

export const getAll = (category, take) => {
  let result = [...posts];

  if (category) {
    result = result.filter((post) => post.category === category);
  }

  if (take) {
    result = result.slice(0, take);
  }

  return result;
};

export const getById = (id) => {
  return posts.find((post) => post.id === id);
};

export const addPost = (post) => {
  return new Promise((resolve) => {
    const newPost = {
      id: posts.length + 1,
      ...post,
    };

    posts.push(newPost);

    resolve(newPost);
  });
};