# Property Listing Website with GraphQL

This project is a property listing website that utilizes GraphQL in TypeScript for querying property data and performing mutations for user interactions. Users can search for properties, view property details, and contact sellers.

## Features

- Search for properties based on criteria such as location, price range, and property type.
- View detailed information about a specific property.
- Contact property sellers to inquire about properties.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or Yarn

### Installation

Clone this repository:

```bash
git clone https://github.com/basemax/GraphQLRealEstateTS.git
```

Navigate to the project directory:

```bash
cd GraphQLRealEstateTS
```

Install dependencies:

```bash
npm install
# or
yarn install
```

## Usage

- Running the Server
- Create a `.env` file in the root directory and provide necessary environment variables (such as database connection details).

Start the server:

```bash
npm start
# or
yarn start
```

## GraphQL Playground

You can access the GraphQL Playground by visiting `http://localhost:3000/graphql` in your browser. This interactive interface allows you to execute queries and mutations.

## GraphQL Schema

### Queries

Search Properties: Retrieve a list of properties based on search criteria.

```graphql
query SearchProperties($location: String, $minPrice: Float, $maxPrice: Float, $propertyType: String) {
  searchProperties(location: $location, minPrice: $minPrice, maxPrice: $maxPrice, propertyType: $propertyType) {
    id
    title
    location
    price
    propertyType
  }
}
```

Get Property Details: Retrieve detailed information about a specific property.

```graphql
query GetPropertyDetails($propertyId: ID!) {
  getPropertyDetails(propertyId: $propertyId) {
    id
    title
    description
    location
    price
    propertyType
    seller {
      id
      name
      contactEmail
    }
  }
}

### Mutations

Contact Seller: Send a message to the property seller.

```graphql
mutation ContactSeller($propertyId: ID!, $message: String!) {
  contactSeller(propertyId: $propertyId, message: $message) {
    success
    message
  }
}
```

### Contributing

Contributions are welcome! If you have suggestions or improvements, please submit a pull request or create an issue.

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Max Base
