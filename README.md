# E-Ticket
Event e-ticketing and partcipant check-in system that streamlined the event flow up to 400% for 600+ participants.

## Built with
![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)

## Features
### User-friendly dashboard
![Screenshot of dashboard](/screenshots/dashboard.jpg)

The dashboard allows the event committees to see participants' registration status and manually check-in participants when needed.

### Easy check-ins for physical events
![Screenshot of checkin](/screenshots/checkin.jpg)

Event committees at the registration counter will scan the e-tickets presented by the participants to do the check-in. This removes the need to manually write down the details (e.g. name, email, check-in time, etc.) and streamlines the check-in process.

### Automated ticket generator & sender
The system takes in the list of participants and generates e-tickets and sends the tickets to the participants through WhatsApp or email. This is the repository for the web dashboard, which doesn't include the code for the ticket generator. You can find the code for the generator in [this other repository](https://github.com/rmrt1n/sigcm-ticket-generator).

## Developing
Instructions to build the project from source.
```bash
# clone this repository
git clone https://github.com/louis-27/e-ticket && cd e-ticket

# install dependencies
yarn add

# run dev server
yarn dev
```

# Himmeversity-ETicket
