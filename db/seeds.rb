Recipe.create([
  {
    name: "Chicken Parm",
    ingredient_list: "1/2 lb Chicken Breasts, 1 Cup Breadcrumbs, 2 Fresh, Ripe Tomatos, All the luck you can muster!",
    instruction_list: "Put the chicken in the pan over medium heat, add breadcrumbs, cook that baby until it's black!",
    user_id: 1,
    user_email: 'casey@casey.com',
    user_name: 'Casey Harding',
    votes: 0
  },
  {
    name: "Pizza",
    ingredient_list: "2 dough balls, 1 ball mozz cheese, 2 Fresh, Ripe Tomatos, Basil",
    instruction_list: "Stretch out those balls, top with sauce, top with cheese, bake the hell out of it!, top with basil",
    user_id: 1,
    user_email: 'casey@casey.com',
    user_name: 'Casey Harding',
    votes: 0
  },
  {
    name: "Cereal",
    ingredient_list: "1 package cereal, 1 Cup milk",
    instruction_list: "Put the cereal in a bowl, add milk",
    user_id: 1,
    user_email: 'casey@casey.com',
    user_name: 'Casey Harding',
    votes: 0
  }
])

Comment.create ([
  {
    poster_id: 2,
    poster_email: 'casey@casey.com',
    poster_name: 'Casey Harding',
    recipe_id: 3,
    title: "Bad!",
    description: "This thing sucks. Add in pepper!",
    previous_comment: 0,
    next_comments: [],
    comment_votes: 0
  },
  {
    poster_id: 3,
    poster_email: 'casey@casey.com',
    poster_name: 'Casey Harding',
    recipe_id: 3,
    title: "I love this!!!",
    description: "Best recipe ever!",
    previous_comment: 0,
    next_comments: [],
    comment_votes: 0
  },
  {
    poster_id: 2,
    poster_email: 'casey@casey.com',
    poster_name: 'Casey Harding',
    recipe_id: 3,
    title: "This guy sucks...",
    description: "What's the deal with this guy?",
    previous_comment: 0,
    next_comments: [],
    comment_votes: 0
  }
])
