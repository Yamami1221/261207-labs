export const cleanUser = (user) => {
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    imgUrl: user.picture.large,
    address: `${user.location.city} ${user.location.state}`,
  };
  return newUser;
};
