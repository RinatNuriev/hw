const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('app', 'root', 'password', {

    host: 'localhost',

    dialect: 'mysql'

});

const User = sequelize.define('User', {

    id: {

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,

        allowNull: false

    },

    name: {

        type: DataTypes.STRING,

        allowNull: false

    }

}, {

    timestamps: false

});

const Post = sequelize.define('Post', {

    id: {

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,

        allowNull: false

    },

    title: {

        type: DataTypes.STRING,

        allowNull: false

    }

}, {

    timestamps: false

});

User.hasMany(Post, {

    foreignKey: {

        name: 'authorId',

        allowNull: false

    }

});

Post.belongsTo(User, {

    foreignKey: {

        name: 'authorId',

        allowNull: false

    }

});

sequelize.sync({ force: true }).then(async () => {

    const ivan = await User.create({ name: 'Ivan' });

    await Post.create({ title: 'First post', authorId: ivan.id });

    await Post.create({ title: 'Second post', authorId: ivan.id });

    const pavel = await User.create({ name: 'Pavel' });

    await Post.create({ title: 'Third post', authorId: pavel.id });

});

let users = await User.findAll();

users.forEach(async user => {

    let userPosts = await user.getPosts();

    console.log(`${user.name} posts`);

    userPosts.forEach(post => console.log(post.id, post.title));

});