Recipe.create([
  {
    name: "Chicken Parm",
    ingredient_list: ["1/2 lb Chicken Breasts", "1 Cup Breadcrumbs", "2 Fresh, Ripe Tomatos", "All the luck you can muster!"],
    instruction_list: ["Put the chicken in the pan over medium heat", "Add breadcrumbs", "Cook that baby until it's black!"],
    user_id: 1,
    votes: 0
  },
  {
    name: "Pizza",
    ingredient_list: ["2 dough balls", "1 ball mozz cheese", "2 Fresh, Ripe Tomatos", "Basil"],
    instruction_list: ["Stretch out those balls", "Top with sauce", "Top with cheese", "Bake the hell out of it!", "Top with basil"],
    user_id: 1,
    votes: 0
  },
  {
    name: "Cereal",
    ingredient_list: ["1 package cereal", "1 Cup milk"],
    instruction_list: ["Put the cereal in a bowl", "Add milk"],
    user_id: 1,
    votes: 0
  }
])

Comment.create ([
  {
    poster_id: 2,
    recipe_id: 1,
    title: "Bad!",
    description: "This thing sucks. Add in pepper!",
    previous_comment: 0,
    next_comment: 2,
    comment_votes: 0
  },
  {
    poster_id: 3,
    recipe_id: 2,
    title: "I love this!!!",
    description: "Best recipe ever!",
    previous_comment: 1,
    next_comment: 3,
    comment_votes: 0
  },
  {
    poster_id: 2,
    recipe_id: 1,
    title: "This guy sucks...",
    description: "What's the deal with this guy?",
    previous_comment: 2,
    next_comment: 0,
    comment_votes: 0
  }
])
