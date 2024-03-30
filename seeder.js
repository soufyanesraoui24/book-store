const {Book}= require('./models/Book');
const {Author}= require('./models/Author');
const {books,authors} = require('./data');
const connectToDb = require('./config/connectToDB');
require('dotenv').config();

//connect to db
connectToDb();

//seed data Books
const seedDataBook = async () => {
    try {
        await Book.insertMany(books);
        console.log('Data inserted successfully');
    } catch (error) {
        console.log(error.message);
    }
}
//delete data books
const deleteDataBook = async () => {
    try {
        await Book.deleteMany({});
        console.log('Data deleted successfully');
    } catch (error) {
        console.log(error.message);
    }
}
//seed data authors
const seedDataAuthor = async () => {
    try {
        await Author.insertMany(authors);
        console.log('Data inserted successfully');
    } catch (error) {
        console.log(error.message);
    }
}
//delete data
const deleteDataAuthor = async () => {
    try {
        await Author.deleteMany({});
        console.log('Data deleted successfully');
    } catch (error) {
        console.log(error.message);
    }
}

if(process.argv[2] === '-db'){
    deleteDataBook();
}
else if(process.argv[2] === '-ib'){
    seedDataAuthor();
}
else if(process.argv[2] === '-da'){
    deleteDataAuthor();
}
else if(process.argv[2] === '-ia'){
    seedDataAuthor();
}
else{
    console.log('Invalid argument');
    process.exit(1);
}





//seed data
// async function seedData(){
//     try {
//         await Book.deleteMany({});
//         console.log('Data deleted successfully');
//         await Book.insertMany(books);
//         console.log('Data inserted successfully');
//     } catch (error) {
//         console.log(error.message);
//     }
// }       

// seedData();
//run the seeder
