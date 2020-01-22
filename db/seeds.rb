# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# lists = List.create([{title: 'WIP'}, {title: 'Complete'}])
items = Item.create([{name: 'new1', description: 'do not break it', listref: 9},
    {name: 'new2', description: 'lol', listref: 10}])


