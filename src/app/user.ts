export class User {
    username: {type: String, lowercase: true, required: true, unique: true};
    password: {type: String, required: true };
    email: {type: String, required: true, lowercase: true, unique: true}
}