# Schema


### User

* fname VARCHAR
* lname: VARCHAR
* username: VARCHAR
* email: VARCHAR
* profileId: INTEGER


### Profile

* age: INTEGER
* gender: VARCHAR
* maritalStatus: VARCHAR
* height: INTEGER
* bodyType: VARCHAR
* kids: BOOLEAN
* pets: ARRAY VARCHAR
* occupation: VARCHAR
* education: VARCHAR
* aboutMe: VARCHAR
* talents: VARCHAR
* favorites: VARCHAR
* hobbies: VARCHAR
* whyMe: VARCHAR
* picture: VARCHAR
* likes: ARRAY INTEGER
* views: ARRAY INTEGER
* vieweBy: ARRAY INTEGER
* locationId: INTEGER
* userId: INTEGER


### Location

* distance: INTEGER
* city: VARCHAR
* state: VARCHAR


sequelize model:create --name User --attributes "fname:string lname:string username:string email:string profileId:integer"

sequelize model:create --name Location --attributes 'distance:integer city:string state:string'

sequelize model:create --name Profile --attributes 'age:integer gender:string maritalStatus:string height:integer bodyType:string kids:boolean pets:boolean occupation:string education:string aboutMe:text talents:text favorites:text whyMe:text picture:string locationId:integer userId:integer'

npm run seed
npm start
