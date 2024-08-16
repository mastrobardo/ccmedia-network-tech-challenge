# CCMEdia Tech Challenge

**Candidate: Davide Arcinotti**

## Install and Run

To install dependencies and run the development server, use the following commands:

```bash
npm i
npm run dev
```

A Dockerfile is also provided. You can build and run the Docker container with the following commands:

```bash
docker build -t ccmedia-challenge .
docker run -p 3000:3000 ccmedia-challenge
```

## Design

I made a slight modification to the requirements by changing the background of the IBU ribbon. The original card background was too colorful.

By using mixins and a set of variables, the design is easy to configure. However, I did not include a theme switcher.

## Testing

I added some really simple tests using Jest.

## Sanitization

Added a simple utility to sanitize inputs. However, in a production environment, this would not be enough.

## Fetch Service

Added a check for potential tokens to be included in the header, although this wasn’t required.

## Devices

I dont own an Ipad so i tested only against Chrome emulator.
