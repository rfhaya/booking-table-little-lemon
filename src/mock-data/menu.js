import * as Images from "../assets";

export const menuCategories = [
  {
    id: "starters",
    label: "Starters",
    icon: "seedling",
  },
  {
    id: "salads",
    label: "Salads",
    icon: "leaf",
  },
  {
    id: "mains",
    label: "Main Courses",
    icon: "utensils",
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: "cake",
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: "glass",
  },
];

export const menuData = {
  /* =====================================================
     STARTERS
  ===================================================== */

  starters: {
    title: "Starters",
    subtitle:
      "Begin your dining experience with fresh Mediterranean flavors, handcrafted appetizers, and ingredients prepared to share.",

    items: [
      {
        id: "starter-1",
        name: "Classic Hummus",
        price: "$8.50",
        image:
          "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=85",
        description:
          "Creamy chickpea dip served with warm pita bread and olive oil.",
        details: {
          description:
            "Our signature hummus is made from slow-cooked chickpeas blended with tahini, lemon juice, garlic, and extra virgin olive oil.",
          calories: "280 kcal",
          preparationTime: "10 min",
          dietary: "Vegetarian",
          ingredients: [
            "Chickpeas",
            "Tahini",
            "Lemon",
            "Garlic",
            "Olive Oil",
            "Pita Bread",
          ],
        },
      },

      {
        id: "starter-2",
        name: "Falafel Bites",
        price: "$9.00",
        image: Images.FalafelBites,
        description: "Crispy herb falafel served with creamy tahini sauce.",
        details: {
          description:
            "Golden fried falafel made with chickpeas, fresh herbs, garlic, and aromatic Mediterranean spices.",
          calories: "320 kcal",
          preparationTime: "12 min",
          dietary: "Vegan",
          ingredients: [
            "Chickpeas",
            "Parsley",
            "Cilantro",
            "Garlic",
            "Tahini",
            "Spices",
          ],
        },
      },

      {
        id: "starter-3",
        name: "Grilled Halloumi",
        price: "$10.50",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
        description: "Warm grilled halloumi with honey, herbs, and citrus.",
        details: {
          description:
            "Pan-grilled halloumi cheese finished with local honey, fresh herbs, and a touch of lemon.",
          calories: "340 kcal",
          preparationTime: "10 min",
          dietary: "Vegetarian",
          ingredients: ["Halloumi", "Honey", "Lemon", "Thyme", "Olive Oil"],
        },
      },

      {
        id: "starter-4",
        name: "Mediterranean Mezze",
        price: "$14.00",
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=85",
        description: "A selection of hummus, olives, vegetables, and pita.",
        details: {
          description:
            "A generous sharing platter featuring classic Mediterranean spreads and seasonal vegetables.",
          calories: "480 kcal",
          preparationTime: "15 min",
          dietary: "Vegetarian",
          ingredients: [
            "Hummus",
            "Olives",
            "Pita",
            "Cucumber",
            "Tomatoes",
            "Feta",
          ],
        },
      },

      {
        id: "starter-5",
        name: "Stuffed Grape Leaves",
        price: "$8.00",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85",
        description: "Tender grape leaves filled with fragrant herb rice.",
        details: {
          description:
            "Traditional grape leaves stuffed with seasoned rice, herbs, lemon, and aromatic spices.",
          calories: "210 kcal",
          preparationTime: "12 min",
          dietary: "Vegan",
          ingredients: ["Grape Leaves", "Rice", "Lemon", "Mint", "Parsley"],
        },
      },

      {
        id: "starter-6",
        name: "Whipped Feta",
        price: "$9.50",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
        description: "Creamy whipped feta with roasted tomatoes and herbs.",
        details: {
          description:
            "Smooth feta whipped with Greek yogurt and topped with slow-roasted cherry tomatoes.",
          calories: "310 kcal",
          preparationTime: "10 min",
          dietary: "Vegetarian",
          ingredients: [
            "Feta",
            "Greek Yogurt",
            "Tomatoes",
            "Olive Oil",
            "Basil",
          ],
        },
      },

      {
        id: "starter-7",
        name: "Crispy Calamari",
        price: "$12.00",
        image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=85",
        description: "Lightly fried calamari with lemon and garlic aioli.",
        details: {
          description:
            "Tender calamari lightly coated and fried until crisp, served with fresh lemon and house aioli.",
          calories: "390 kcal",
          preparationTime: "14 min",
          dietary: "Seafood",
          ingredients: ["Calamari", "Flour", "Lemon", "Garlic", "Aioli"],
        },
      },

      {
        id: "starter-8",
        name: "Spanakopita",
        price: "$9.00",
        image: Images.Spanakopita,
        description: "Flaky pastry filled with spinach, feta, and herbs.",
        details: {
          description:
            "Golden filo pastry layered with spinach, feta cheese, dill, and Mediterranean herbs.",
          calories: "350 kcal",
          preparationTime: "12 min",
          dietary: "Vegetarian",
          ingredients: ["Spinach", "Feta", "Filo Pastry", "Dill", "Olive Oil"],
        },
      },

      {
        id: "starter-9",
        name: "Garlic Pita Bread",
        price: "$6.50",
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
        description: "Warm toasted pita brushed with garlic herb butter.",
        details: {
          description:
            "Freshly baked pita bread toasted and finished with garlic, herbs, and olive oil.",
          calories: "240 kcal",
          preparationTime: "8 min",
          dietary: "Vegetarian",
          ingredients: ["Pita Bread", "Garlic", "Butter", "Parsley"],
        },
      },

      {
        id: "starter-10",
        name: "Roasted Eggplant Dip",
        price: "$8.50",
        image:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=85",
        description: "Smoky roasted eggplant blended with tahini and lemon.",
        details: {
          description:
            "Slow-roasted eggplant blended into a creamy Mediterranean dip with tahini and lemon.",
          calories: "260 kcal",
          preparationTime: "10 min",
          dietary: "Vegan",
          ingredients: ["Eggplant", "Tahini", "Lemon", "Garlic", "Olive Oil"],
        },
      },

      {
        id: "starter-11",
        name: "Marinated Olives",
        price: "$6.00",
        image: Images.MarinatedOlives,
        description: "Mixed Mediterranean olives with citrus and herbs.",
        details: {
          description:
            "A flavorful mix of green and black olives marinated with orange peel, rosemary, and olive oil.",
          calories: "190 kcal",
          preparationTime: "5 min",
          dietary: "Vegan",
          ingredients: ["Green Olives", "Black Olives", "Orange", "Rosemary"],
        },
      },

      {
        id: "starter-12",
        name: "Fried Zucchini",
        price: "$8.00",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=85",
        description: "Crispy zucchini slices served with yogurt dip.",
        details: {
          description:
            "Thinly sliced zucchini lightly fried and served with a refreshing herb yogurt sauce.",
          calories: "290 kcal",
          preparationTime: "10 min",
          dietary: "Vegetarian",
          ingredients: ["Zucchini", "Flour", "Yogurt", "Mint", "Lemon"],
        },
      },

      {
        id: "starter-13",
        name: "Shrimp Saganaki",
        price: "$13.50",
        image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=85",
        description: "Shrimp baked in rich tomato sauce with feta.",
        details: {
          description:
            "Juicy shrimp cooked in a rich tomato sauce and finished with crumbled feta cheese.",
          calories: "410 kcal",
          preparationTime: "16 min",
          dietary: "Seafood",
          ingredients: ["Shrimp", "Tomatoes", "Feta", "Garlic", "Olive Oil"],
        },
      },

      {
        id: "starter-14",
        name: "Herb Arancini",
        price: "$10.00",
        image:
          "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=85",
        description: "Golden risotto bites with herbs and melted cheese.",
        details: {
          description:
            "Crispy risotto balls filled with herbs and cheese, served with tomato dipping sauce.",
          calories: "380 kcal",
          preparationTime: "14 min",
          dietary: "Vegetarian",
          ingredients: [
            "Arborio Rice",
            "Parmesan",
            "Mozzarella",
            "Herbs",
            "Tomato Sauce",
          ],
        },
      },

      {
        id: "starter-15",
        name: "Tomato Bruschetta",
        price: "$8.50",
        image:
          "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=85",
        description:
          "Grilled bread topped with tomatoes, basil, and olive oil.",
        details: {
          description:
            "Rustic toasted bread topped with ripe tomatoes, fresh basil, garlic, and extra virgin olive oil.",
          calories: "270 kcal",
          preparationTime: "8 min",
          dietary: "Vegan",
          ingredients: ["Bread", "Tomatoes", "Basil", "Garlic", "Olive Oil"],
        },
      },
    ],
  },

  /* =====================================================
     SALADS
  ===================================================== */

  salads: {
    title: "Fresh Salads",
    subtitle:
      "Colorful, seasonal, and full of fresh ingredients inspired by the vibrant Mediterranean coastline.",

    items: [
      {
        id: "salad-1",
        name: "Greek Village Salad",
        price: "$11.00",
        image: Images.GreekVillageSalad,
        description: "Fresh tomatoes, cucumber, olives, feta, and oregano.",
        details: {
          description:
            "A classic Greek salad with crisp vegetables, creamy feta, Kalamata olives, and oregano.",
          calories: "280 kcal",
          preparationTime: "8 min",
          dietary: "Vegetarian",
          ingredients: [
            "Tomatoes",
            "Cucumber",
            "Feta",
            "Olives",
            "Onion",
            "Oregano",
          ],
        },
      },

      {
        id: "salad-2",
        name: "Mediterranean Quinoa",
        price: "$12.50",
        image: Images.MediterraneanQuinoa,
        description: "Nutritious quinoa with roasted vegetables and herbs.",
        details: {
          description:
            "Protein-rich quinoa tossed with roasted vegetables, herbs, lemon, and olive oil.",
          calories: "360 kcal",
          preparationTime: "10 min",
          dietary: "Vegan",
          ingredients: ["Quinoa", "Tomatoes", "Cucumber", "Parsley", "Lemon"],
        },
      },

      {
        id: "salad-3",
        name: "Classic Caesar",
        price: "$11.50",
        image:
          "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=85",
        description: "Crisp romaine, parmesan, croutons, and house dressing.",
        details: {
          description:
            "Fresh romaine lettuce tossed with parmesan, crunchy croutons, and creamy Caesar dressing.",
          calories: "420 kcal",
          preparationTime: "8 min",
          dietary: "Vegetarian",
          ingredients: ["Romaine", "Parmesan", "Croutons", "Caesar Dressing"],
        },
      },

      {
        id: "salad-4",
        name: "Roasted Beet Salad",
        price: "$12.00",
        image: Images.RoastedBeetSalad,
        description: "Roasted beetroot with feta, walnuts, and greens.",
        details: {
          description:
            "Sweet roasted beetroot paired with creamy feta, toasted walnuts, and fresh greens.",
          calories: "330 kcal",
          preparationTime: "12 min",
          dietary: "Vegetarian",
          ingredients: ["Beetroot", "Feta", "Walnuts", "Mixed Greens"],
        },
      },

      {
        id: "salad-5",
        name: "Chicken Avocado Salad",
        price: "$14.50",
        image: Images.ChickenAvocadoSalad,
        description:
          "Grilled chicken with avocado, greens, and citrus dressing.",
        details: {
          description:
            "Tender grilled chicken served over fresh greens with avocado and lemon dressing.",
          calories: "480 kcal",
          preparationTime: "14 min",
          dietary: "High Protein",
          ingredients: ["Chicken", "Avocado", "Lettuce", "Tomatoes", "Lemon"],
        },
      },

      {
        id: "salad-6",
        name: "Tabbouleh Salad",
        price: "$10.00",
        image: Images.TabboulehSalad,
        description: "Fresh parsley, bulgur, tomatoes, and lemon dressing.",
        details: {
          description:
            "A refreshing Levantine salad made with parsley, bulgur wheat, tomatoes, mint, and lemon.",
          calories: "240 kcal",
          preparationTime: "8 min",
          dietary: "Vegan",
          ingredients: ["Parsley", "Bulgur", "Tomatoes", "Mint", "Lemon"],
        },
      },

      {
        id: "salad-7",
        name: "Fattoush Salad",
        price: "$10.50",
        image: Images.FattoushSalad,
        description: "Crisp vegetables, herbs, and toasted pita chips.",
        details: {
          description:
            "Fresh chopped vegetables tossed with herbs, toasted pita, and tangy sumac dressing.",
          calories: "310 kcal",
          preparationTime: "10 min",
          dietary: "Vegan",
          ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Pita", "Sumac"],
        },
      },

      {
        id: "salad-8",
        name: "Pear & Walnut Salad",
        price: "$12.00",
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85",
        description: "Fresh pear, walnuts, cheese, and mixed greens.",
        details: {
          description:
            "Sweet pear slices paired with toasted walnuts, soft cheese, and fresh greens.",
          calories: "350 kcal",
          preparationTime: "8 min",
          dietary: "Vegetarian",
          ingredients: ["Pear", "Walnuts", "Mixed Greens", "Goat Cheese"],
        },
      },

      {
        id: "salad-9",
        name: "Tuna Nicoise",
        price: "$15.00",
        image: Images.TunaNicoise,
        description: "Seared tuna, potatoes, egg, olives, and greens.",
        details: {
          description:
            "A Mediterranean-inspired Nicoise with tuna, eggs, potatoes, olives, and seasonal vegetables.",
          calories: "490 kcal",
          preparationTime: "15 min",
          dietary: "Seafood",
          ingredients: ["Tuna", "Egg", "Potatoes", "Olives", "Green Beans"],
        },
      },

      {
        id: "salad-10",
        name: "Couscous Garden Salad",
        price: "$11.00",
        image: Images.CouscousGardenSalad,
        description: "Fluffy couscous with herbs, vegetables, and lemon.",
        details: {
          description:
            "Light couscous tossed with fresh herbs, seasonal vegetables, and citrus dressing.",
          calories: "320 kcal",
          preparationTime: "10 min",
          dietary: "Vegan",
          ingredients: ["Couscous", "Tomatoes", "Cucumber", "Parsley", "Lemon"],
        },
      },

      {
        id: "salad-11",
        name: "Caprese Salad",
        price: "$12.50",
        image:
          "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=85",
        description: "Tomatoes, mozzarella, basil, and olive oil.",
        details: {
          description:
            "Simple Italian-inspired salad with ripe tomatoes, fresh mozzarella, basil, and olive oil.",
          calories: "360 kcal",
          preparationTime: "7 min",
          dietary: "Vegetarian",
          ingredients: ["Tomatoes", "Mozzarella", "Basil", "Olive Oil"],
        },
      },

      {
        id: "salad-12",
        name: "Lentil Herb Salad",
        price: "$11.50",
        image: Images.LentilHerbSalad,
        description: "Earthy lentils with herbs and roasted vegetables.",
        details: {
          description:
            "Nutritious lentils combined with herbs, roasted vegetables, and a citrus vinaigrette.",
          calories: "370 kcal",
          preparationTime: "12 min",
          dietary: "Vegan",
          ingredients: ["Lentils", "Parsley", "Carrots", "Tomatoes", "Lemon"],
        },
      },

      {
        id: "salad-13",
        name: "Grilled Peach Salad",
        price: "$13.00",
        image: Images.GrilledPeachSalad,
        description: "Grilled peaches with greens, feta, and nuts.",
        details: {
          description:
            "Sweet grilled peaches served with greens, feta cheese, and toasted nuts.",
          calories: "340 kcal",
          preparationTime: "10 min",
          dietary: "Vegetarian",
          ingredients: ["Peach", "Feta", "Arugula", "Almonds"],
        },
      },

      {
        id: "salad-14",
        name: "Shrimp Citrus Salad",
        price: "$15.50",
        image: Images.ShrimpCitrusSalad,
        description: "Grilled shrimp with citrus, avocado, and greens.",
        details: {
          description:
            "Juicy grilled shrimp paired with fresh citrus segments, avocado, and mixed greens.",
          calories: "410 kcal",
          preparationTime: "14 min",
          dietary: "Seafood",
          ingredients: ["Shrimp", "Orange", "Avocado", "Greens", "Lemon"],
        },
      },

      {
        id: "salad-15",
        name: "Mediterranean Kale",
        price: "$12.00",
        image: Images.MediterraneanKale,
        description: "Massaged kale with chickpeas, feta, and lemon.",
        details: {
          description:
            "Fresh kale tossed with chickpeas, feta cheese, toasted seeds, and lemon dressing.",
          calories: "390 kcal",
          preparationTime: "10 min",
          dietary: "Vegetarian",
          ingredients: ["Kale", "Chickpeas", "Feta", "Seeds", "Lemon"],
        },
      },
    ],
  },

  /* =====================================================
     MAIN COURSES
  ===================================================== */

  mains: {
    title: "Main Courses",
    subtitle:
      "Thoughtfully prepared Mediterranean dishes featuring quality ingredients, bold flavors, and timeless recipes.",

    items: [
      {
        id: "main-1",
        name: "Grilled Salmon",
        price: "$22.00",
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=85",
        description: "Herb grilled salmon with roasted vegetables and lemon.",
        details: {
          description:
            "Fresh salmon grilled until perfectly tender and served with seasonal roasted vegetables.",
          calories: "620 kcal",
          preparationTime: "20 min",
          dietary: "Pescatarian",
          ingredients: ["Salmon", "Lemon", "Zucchini", "Tomatoes", "Herbs"],
        },
      },

      {
        id: "main-2",
        name: "Lemon Herb Chicken",
        price: "$18.50",
        image:
          "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=85",
        description: "Tender grilled chicken with herbs and roasted potatoes.",
        details: {
          description:
            "Juicy grilled chicken marinated with lemon, garlic, and Mediterranean herbs.",
          calories: "680 kcal",
          preparationTime: "22 min",
          dietary: "High Protein",
          ingredients: ["Chicken", "Lemon", "Garlic", "Potatoes", "Rosemary"],
        },
      },

      {
        id: "main-3",
        name: "Seafood Linguine",
        price: "$21.00",
        image:
          "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=85",
        description: "Linguine pasta with shrimp, mussels, and tomato sauce.",
        details: {
          description:
            "Fresh pasta tossed with Mediterranean seafood in a rich tomato and herb sauce.",
          calories: "710 kcal",
          preparationTime: "20 min",
          dietary: "Seafood",
          ingredients: ["Linguine", "Shrimp", "Mussels", "Tomatoes", "Garlic"],
        },
      },

      {
        id: "main-4",
        name: "Vegetable Moussaka",
        price: "$16.50",
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=85",
        description:
          "Layers of eggplant, potatoes, vegetables, and creamy sauce.",
        details: {
          description:
            "A comforting baked Mediterranean classic layered with roasted vegetables and béchamel sauce.",
          calories: "580 kcal",
          preparationTime: "25 min",
          dietary: "Vegetarian",
          ingredients: [
            "Eggplant",
            "Potatoes",
            "Tomatoes",
            "Béchamel",
            "Cheese",
          ],
        },
      },

      {
        id: "main-5",
        name: "Lamb Kofta",
        price: "$21.50",
        image:
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=85",
        description: "Grilled lamb skewers with rice and yogurt sauce.",
        details: {
          description:
            "Seasoned lamb kofta grilled over an open flame and served with fragrant rice.",
          calories: "720 kcal",
          preparationTime: "22 min",
          dietary: "High Protein",
          ingredients: ["Lamb", "Rice", "Yogurt", "Parsley", "Spices"],
        },
      },

      {
        id: "main-6",
        name: "Truffle Mushroom Pasta",
        price: "$18.00",
        image:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85",
        description: "Creamy pasta with mushrooms and aromatic truffle oil.",
        details: {
          description:
            "Silky pasta tossed with sautéed mushrooms, parmesan, and a touch of truffle oil.",
          calories: "690 kcal",
          preparationTime: "18 min",
          dietary: "Vegetarian",
          ingredients: [
            "Pasta",
            "Mushrooms",
            "Parmesan",
            "Cream",
            "Truffle Oil",
          ],
        },
      },

      {
        id: "main-7",
        name: "Chicken Shawarma Plate",
        price: "$17.50",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=85",
        description: "Spiced chicken served with rice, salad, and tahini.",
        details: {
          description:
            "Marinated chicken roasted with aromatic spices and served with rice and fresh salad.",
          calories: "730 kcal",
          preparationTime: "20 min",
          dietary: "High Protein",
          ingredients: ["Chicken", "Rice", "Tahini", "Garlic", "Spices"],
        },
      },

      {
        id: "main-8",
        name: "Grilled Sea Bass",
        price: "$23.00",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
        description: "Fresh sea bass with lemon butter and vegetables.",
        details: {
          description:
            "Delicately grilled sea bass served with seasonal vegetables and citrus butter.",
          calories: "590 kcal",
          preparationTime: "22 min",
          dietary: "Pescatarian",
          ingredients: ["Sea Bass", "Lemon", "Butter", "Vegetables", "Herbs"],
        },
      },

      {
        id: "main-9",
        name: "Eggplant Parmigiana",
        price: "$17.00",
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=85",
        description: "Baked eggplant layered with tomato and mozzarella.",
        details: {
          description:
            "Tender roasted eggplant layered with rich tomato sauce, mozzarella, and parmesan.",
          calories: "640 kcal",
          preparationTime: "25 min",
          dietary: "Vegetarian",
          ingredients: ["Eggplant", "Mozzarella", "Parmesan", "Tomato Sauce"],
        },
      },

      {
        id: "main-10",
        name: "Braised Lamb Shank",
        price: "$24.50",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
        description: "Slow cooked lamb with herbs and creamy mashed potatoes.",
        details: {
          description:
            "Tender lamb slowly braised with Mediterranean herbs until rich and fall-apart tender.",
          calories: "810 kcal",
          preparationTime: "35 min",
          dietary: "High Protein",
          ingredients: [
            "Lamb",
            "Potatoes",
            "Rosemary",
            "Garlic",
            "Red Wine Sauce",
          ],
        },
      },

      {
        id: "main-11",
        name: "Pesto Chicken Pasta",
        price: "$18.50",
        image:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85",
        description: "Creamy pesto pasta with grilled chicken and parmesan.",
        details: {
          description:
            "Fresh pasta tossed in basil pesto with grilled chicken and parmesan cheese.",
          calories: "740 kcal",
          preparationTime: "18 min",
          dietary: "High Protein",
          ingredients: ["Chicken", "Pasta", "Basil", "Parmesan", "Pine Nuts"],
        },
      },

      {
        id: "main-12",
        name: "Mediterranean Risotto",
        price: "$17.50",
        image:
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=85",
        description: "Creamy risotto with roasted vegetables and parmesan.",
        details: {
          description:
            "Creamy Arborio rice cooked slowly with roasted vegetables and aged parmesan.",
          calories: "610 kcal",
          preparationTime: "25 min",
          dietary: "Vegetarian",
          ingredients: ["Arborio Rice", "Parmesan", "Zucchini", "Tomatoes"],
        },
      },

      {
        id: "main-13",
        name: "Garlic Butter Shrimp",
        price: "$20.00",
        image:
          "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=85",
        description: "Pan seared shrimp with garlic butter and herbs.",
        details: {
          description:
            "Juicy shrimp sautéed in garlic butter with herbs and fresh lemon.",
          calories: "520 kcal",
          preparationTime: "15 min",
          dietary: "Seafood",
          ingredients: ["Shrimp", "Garlic", "Butter", "Lemon", "Parsley"],
        },
      },

      {
        id: "main-14",
        name: "Beef Tenderloin",
        price: "$26.00",
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85",
        description: "Tender beef with roasted vegetables and herb sauce.",
        details: {
          description:
            "Perfectly cooked beef tenderloin served with seasonal vegetables and rich herb sauce.",
          calories: "780 kcal",
          preparationTime: "28 min",
          dietary: "High Protein",
          ingredients: ["Beef", "Potatoes", "Carrots", "Herbs", "Sauce"],
        },
      },

      {
        id: "main-15",
        name: "Spinach Ricotta Ravioli",
        price: "$17.00",
        image:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85",
        description:
          "Handcrafted ravioli with spinach, ricotta, and tomato sauce.",
        details: {
          description:
            "Delicate pasta parcels filled with spinach and ricotta in a light tomato basil sauce.",
          calories: "640 kcal",
          preparationTime: "20 min",
          dietary: "Vegetarian",
          ingredients: ["Ravioli", "Spinach", "Ricotta", "Tomatoes", "Basil"],
        },
      },
    ],
  },

  /* =====================================================
     DESSERTS
  ===================================================== */

  desserts: {
    title: "Desserts",
    subtitle:
      "End your meal with handcrafted sweets inspired by traditional Mediterranean flavors and seasonal ingredients.",

    items: [
      {
        id: "dessert-1",
        name: "Classic Tiramisu",
        price: "$8.50",
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=85",
        description: "Espresso soaked layers with mascarpone and cocoa.",
        details: {
          description:
            "A classic Italian dessert made with espresso-soaked ladyfingers and creamy mascarpone.",
          calories: "460 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa"],
        },
      },

      {
        id: "dessert-2",
        name: "Baklava",
        price: "$7.50",
        image:
          "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=85",
        description: "Layered filo pastry with nuts and honey syrup.",
        details: {
          description:
            "Crisp layers of filo pastry filled with nuts and finished with fragrant honey syrup.",
          calories: "420 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Filo Pastry", "Pistachios", "Walnuts", "Honey"],
        },
      },

      {
        id: "dessert-3",
        name: "Lemon Olive Oil Cake",
        price: "$8.00",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85",
        description: "Moist citrus cake finished with lemon glaze.",
        details: {
          description:
            "A light Mediterranean-style olive oil cake infused with fresh lemon.",
          calories: "380 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Olive Oil", "Lemon", "Flour", "Sugar", "Egg"],
        },
      },

      {
        id: "dessert-4",
        name: "Pistachio Cheesecake",
        price: "$9.00",
        image:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=85",
        description: "Creamy cheesecake with roasted pistachio crumble.",
        details: {
          description:
            "Smooth baked cheesecake topped with roasted pistachios and a delicate cream finish.",
          calories: "520 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Cream Cheese", "Pistachios", "Cream", "Butter"],
        },
      },

      {
        id: "dessert-5",
        name: "Chocolate Fondant",
        price: "$9.50",
        image:
          "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85",
        description: "Warm chocolate cake with a rich molten center.",
        details: {
          description:
            "Decadent baked chocolate cake with a warm and flowing molten center.",
          calories: "540 kcal",
          preparationTime: "12 min",
          dietary: "Vegetarian",
          ingredients: ["Dark Chocolate", "Butter", "Egg", "Flour"],
        },
      },

      {
        id: "dessert-6",
        name: "Greek Yogurt Parfait",
        price: "$7.00",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=85",
        description: "Greek yogurt layered with honey, fruit, and granola.",
        details: {
          description:
            "Creamy Greek yogurt layered with seasonal fruits, honey, and crunchy granola.",
          calories: "310 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Greek Yogurt", "Honey", "Berries", "Granola"],
        },
      },

      {
        id: "dessert-7",
        name: "Panna Cotta",
        price: "$8.00",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=85",
        description: "Silky vanilla cream served with berry compote.",
        details: {
          description:
            "Classic Italian panna cotta with smooth vanilla cream and seasonal berry sauce.",
          calories: "390 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Cream", "Vanilla", "Sugar", "Berries"],
        },
      },

      {
        id: "dessert-8",
        name: "Honey Semolina Cake",
        price: "$7.50",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85",
        description: "Traditional semolina cake soaked in warm honey syrup.",
        details: {
          description:
            "Soft semolina cake infused with citrus and soaked in fragrant honey syrup.",
          calories: "410 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Semolina", "Honey", "Lemon", "Almonds"],
        },
      },

      {
        id: "dessert-9",
        name: "Affogato",
        price: "$6.50",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=85",
        description: "Vanilla gelato served with freshly brewed espresso.",
        details: {
          description:
            "A simple Italian classic combining creamy vanilla gelato and rich espresso.",
          calories: "240 kcal",
          preparationTime: "3 min",
          dietary: "Vegetarian",
          ingredients: ["Vanilla Gelato", "Espresso"],
        },
      },

      {
        id: "dessert-10",
        name: "Orange Almond Cake",
        price: "$8.00",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85",
        description: "Moist almond cake infused with fresh orange.",
        details: {
          description:
            "A fragrant almond cake made with fresh orange zest and topped with sliced almonds.",
          calories: "370 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Almonds", "Orange", "Flour", "Egg"],
        },
      },

      {
        id: "dessert-11",
        name: "Chocolate Baklava",
        price: "$8.50",
        image:
          "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=85",
        description: "Traditional baklava with dark chocolate and pistachios.",
        details: {
          description:
            "A modern take on classic baklava featuring pistachios and rich dark chocolate.",
          calories: "470 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Filo", "Pistachios", "Chocolate", "Honey"],
        },
      },

      {
        id: "dessert-12",
        name: "Berry Mille Feuille",
        price: "$9.00",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=85",
        description: "Crisp pastry layers with cream and seasonal berries.",
        details: {
          description:
            "Delicate pastry layers filled with vanilla cream and fresh berries.",
          calories: "430 kcal",
          preparationTime: "8 min",
          dietary: "Vegetarian",
          ingredients: ["Pastry", "Cream", "Strawberries", "Blueberries"],
        },
      },

      {
        id: "dessert-13",
        name: "Vanilla Gelato",
        price: "$6.00",
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=85",
        description: "Creamy artisan vanilla gelato with seasonal garnish.",
        details: {
          description:
            "Smooth Italian-style vanilla gelato made with rich cream and natural vanilla.",
          calories: "260 kcal",
          preparationTime: "3 min",
          dietary: "Vegetarian",
          ingredients: ["Milk", "Cream", "Vanilla", "Sugar"],
        },
      },

      {
        id: "dessert-14",
        name: "Fig & Honey Tart",
        price: "$8.50",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85",
        description: "Buttery tart with fresh figs and Mediterranean honey.",
        details: {
          description:
            "A buttery pastry tart filled with fresh figs, honey, and a touch of thyme.",
          calories: "410 kcal",
          preparationTime: "7 min",
          dietary: "Vegetarian",
          ingredients: ["Figs", "Honey", "Butter", "Thyme"],
        },
      },

      {
        id: "dessert-15",
        name: "Caramel Flan",
        price: "$7.50",
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=85",
        description: "Silky baked custard topped with golden caramel.",
        details: {
          description:
            "A smooth and creamy baked custard finished with a rich caramel sauce.",
          calories: "350 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Milk", "Egg", "Vanilla", "Caramel"],
        },
      },
    ],
  },

  /* =====================================================
     DRINKS
  ===================================================== */

  drinks: {
    title: "Drinks",
    subtitle:
      "Refreshing handcrafted beverages inspired by Mediterranean fruits, herbs, coffee culture, and sunny coastal afternoons.",

    items: [
      {
        id: "drink-1",
        name: "Fresh Lemonade",
        price: "$5.50",
        image:
          "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=85",
        description:
          "Fresh squeezed lemon juice with mint and sparkling water.",
        details: {
          description:
            "A refreshing blend of freshly squeezed lemons, mint leaves, and sparkling water.",
          calories: "120 kcal",
          preparationTime: "5 min",
          dietary: "Vegan",
          ingredients: ["Lemon", "Mint", "Sparkling Water", "Sugar"],
        },
      },

      {
        id: "drink-2",
        name: "Iced Matcha Latte",
        price: "$6.50",
        image:
          "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=800&q=85",
        description: "Premium matcha blended with milk and ice.",
        details: {
          description:
            "Smooth ceremonial matcha blended with creamy milk and served over ice.",
          calories: "180 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Matcha", "Milk", "Ice", "Honey"],
        },
      },

      {
        id: "drink-3",
        name: "Mediterranean Mojito",
        price: "$7.00",
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=85",
        description: "Refreshing mint, lime, citrus, and sparkling water.",
        details: {
          description:
            "A bright non-alcoholic mojito inspired by fresh Mediterranean citrus and herbs.",
          calories: "140 kcal",
          preparationTime: "5 min",
          dietary: "Vegan",
          ingredients: ["Lime", "Mint", "Sparkling Water", "Sugar"],
        },
      },

      {
        id: "drink-4",
        name: "Espresso",
        price: "$4.00",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=85",
        description: "Rich Italian espresso with deep roasted flavor.",
        details: {
          description:
            "A short and intense espresso brewed from freshly ground premium coffee beans.",
          calories: "5 kcal",
          preparationTime: "3 min",
          dietary: "Vegan",
          ingredients: ["Coffee Beans", "Water"],
        },
      },

      {
        id: "drink-5",
        name: "Iced Latte",
        price: "$5.50",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=85",
        description: "Smooth espresso combined with chilled milk and ice.",
        details: {
          description:
            "Fresh espresso poured over ice and creamy milk for a refreshing coffee experience.",
          calories: "150 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Espresso", "Milk", "Ice"],
        },
      },

      {
        id: "drink-6",
        name: "Peach Iced Tea",
        price: "$5.50",
        image: Images.PeachIcedTea,
        description: "Fresh brewed tea infused with peach and citrus.",
        details: {
          description:
            "Refreshing black tea infused with ripe peaches and a touch of citrus.",
          calories: "130 kcal",
          preparationTime: "5 min",
          dietary: "Vegan",
          ingredients: ["Black Tea", "Peach", "Lemon", "Ice"],
        },
      },

      {
        id: "drink-7",
        name: "Berry Smoothie",
        price: "$7.00",
        image:
          "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=85",
        description: "Mixed berries blended with yogurt and honey.",
        details: {
          description:
            "A creamy blend of seasonal berries, yogurt, and natural honey.",
          calories: "280 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Strawberries", "Blueberries", "Yogurt", "Honey"],
        },
      },

      {
        id: "drink-8",
        name: "Orange Basil Spritz",
        price: "$6.50",
        image:
          "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=85",
        description: "Fresh orange juice, basil, and sparkling water.",
        details: {
          description:
            "A vibrant citrus spritz made with fresh orange juice, basil, and sparkling water.",
          calories: "110 kcal",
          preparationTime: "5 min",
          dietary: "Vegan",
          ingredients: ["Orange", "Basil", "Sparkling Water", "Ice"],
        },
      },

      {
        id: "drink-9",
        name: "Cold Brew",
        price: "$5.00",
        image:
          "https://images.unsplash.com/photo-1461988091159-192b6df7054f?auto=format&fit=crop&w=800&q=85",
        description: "Slow brewed cold coffee with smooth chocolate notes.",
        details: {
          description:
            "Coffee slowly brewed for hours to create a naturally smooth and refreshing cold brew.",
          calories: "10 kcal",
          preparationTime: "3 min",
          dietary: "Vegan",
          ingredients: ["Coffee", "Water", "Ice"],
        },
      },

      {
        id: "drink-10",
        name: "Strawberry Cooler",
        price: "$6.50",
        image:
          "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=85",
        description: "Fresh strawberries, lemon, mint, and sparkling water.",
        details: {
          description:
            "A refreshing sparkling drink with muddled strawberries, lemon, and fresh mint.",
          calories: "120 kcal",
          preparationTime: "5 min",
          dietary: "Vegan",
          ingredients: ["Strawberry", "Lemon", "Mint", "Sparkling Water"],
        },
      },

      {
        id: "drink-11",
        name: "Vanilla Milkshake",
        price: "$7.50",
        image:
          "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=85",
        description: "Creamy vanilla shake topped with whipped cream.",
        details: {
          description:
            "A thick and creamy vanilla milkshake blended with premium ice cream.",
          calories: "520 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Vanilla Ice Cream", "Milk", "Cream"],
        },
      },

      {
        id: "drink-12",
        name: "Cucumber Mint Cooler",
        price: "$5.50",
        image:
          "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85",
        description: "Cool cucumber, mint, lime, and sparkling water.",
        details: {
          description:
            "A light and refreshing combination of cucumber, mint, lime, and sparkling water.",
          calories: "70 kcal",
          preparationTime: "5 min",
          dietary: "Vegan",
          ingredients: ["Cucumber", "Mint", "Lime", "Sparkling Water"],
        },
      },

      {
        id: "drink-13",
        name: "Hot Cappuccino",
        price: "$5.00",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=85",
        description: "Rich espresso topped with silky steamed milk foam.",
        details: {
          description:
            "A classic cappuccino with balanced espresso and smooth microfoam.",
          calories: "120 kcal",
          preparationTime: "5 min",
          dietary: "Vegetarian",
          ingredients: ["Espresso", "Milk"],
        },
      },

      {
        id: "drink-14",
        name: "Mango Passion Fruit",
        price: "$7.00",
        image:
          "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=85",
        description: "Tropical mango and passion fruit blended with ice.",
        details: {
          description:
            "A bright tropical blend of ripe mango, passion fruit, and crushed ice.",
          calories: "190 kcal",
          preparationTime: "5 min",
          dietary: "Vegan",
          ingredients: ["Mango", "Passion Fruit", "Ice", "Lime"],
        },
      },

      {
        id: "drink-15",
        name: "Rosemary Citrus Soda",
        price: "$6.00",
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=85",
        description: "Sparkling citrus drink infused with fresh rosemary.",
        details: {
          description:
            "A sophisticated sparkling drink combining lemon, orange, and aromatic rosemary.",
          calories: "90 kcal",
          preparationTime: "5 min",
          dietary: "Vegan",
          ingredients: ["Lemon", "Orange", "Rosemary", "Sparkling Water"],
        },
      },
    ],
  },
};
