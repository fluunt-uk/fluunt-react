[![CircleCI](https://circleci.com/gh/ProjectReferral/Get-me-in/tree/master.svg?style=svg&circle-token=632ab80f9b534a6dab955b1f27f267b00b700ac4)](https://circleci.com/gh/ProjectReferral/Get-me-in/tree/master)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat)]()
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

## Available Scripts

In the project directory, you can run:

### `npm devstart`

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.


### `npm build && npm start`

Runs the app in the production mode.<br>

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.




# Referral Marketing System

## Technical Overview

All the current microservices are built using GO with a mix of request-driven and event-driven architecture. For event-driven, we using RabbitMQ to broadcast messages.

#### Current API:
- [dev complete]Authentication API(auth-API) - handles the lifecycle of JSON Web Tokens(JWT).
- [dev complete]Account API(account-API) - handles all the CRUD operations to do with users.
- [dev complete]Marketing API(marketing-API) - handles all the CRUD operations to do with job adverts.
- [Under dev]Customer API(customer-API) - handles email confirmations, reset passwords and any other communications between the consumer and producer.
- [under dev]Payment API - integrated with Stripe Pay, it will handle payments and subscriptions.


#### New services under development/analysis:
- Messaging Service(msg-service) - handles instant messaging between users.

#### Front-end:
Front end is designed using React and Redux.

#### Deploy process:
We using GitLab to manage our build pipeline. To manage our infrastructure, we are using Docker and AWS.

#### Future work:
- Service orchestration using K8s or Docker Swarms
- Setup ELB(Elastic Load Balancer)
- Terraform to manage AWS infrastructure
- Setup Grafana


## High level overview
![High-level Architecture](high-level.png)


