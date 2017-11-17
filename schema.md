# Schema


### User

* fname VARCHAR
* lname: VARCHAR
* username: VARCHAR
* email: VARCHAR
* profileId: INTEGER


### Profile

* birthday: DATE
* gender: VARCHAR
* maritalStatus: VARCHAR
* height: VARCHAR
* bodyType: VARCHAR
* kids: BOOLEAN
* pets: BOOLEAN
* occupation: VARCHAR
* education: VARCHAR
* aboutMe: VARCHAR
* talents: VARCHAR
* favorites: VARCHAR
* whyMe: VARCHAR
* picture: VARCHAR
* locationId: INTEGER
* userId: INTEGER


### Location

* distance: INTEGER
* city: VARCHAR


sequelize model:create --name User --attributes "fname:string lname:string username:string email:string profileId:integer"

sequelize model:create --name Location --attributes 'distance:integer city:string'

sequelize model:create --name Profile --attributes 'birthday:dateonly gender:string maritalStatus:string height:string bodyType:string kids:boolean pets:boolean occupation:string education:string aboutMe:text talents:text favorites:text whyMe:text picture:string locationId:integer userId:integer'
