const nodemailer = require('nodemailer');
const appliedDto = require('../applied/applied_dto');
require('dotenv').config()

// TODO need email to do this
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    // Verify transporter
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Transporter verification failed:', error);
      } else {
        console.log('Transporter is ready to send emails.');
      }
    });
  }

  async sendInvitationEmail(data) {
    console.log(data)
    const {subject, address, seekers} = data;
    const emails = seekers.map(seeker => seeker.email);
    const mailOptions = {
      from: ` ${data.company_email}`, // Sender address
      to: emails.join(','), // List of recipients
      subject: subject,
      text: `You are invited to an interview in ${address} for position ${data.job_title} at ${data.company_name}.`,
      html: `<p>You are invited to an interview in <strong>${address}</strong> for position <strong>${data.job_title} </strong> at <strong>${data.company_name}</strong>.</p><br>${data.company_phone}<br>${data.company_email} <br> best regards`,
    };

    try {
      console.log('Sending mail with options:', mailOptions);
      const result = await this.transporter.sendMail(mailOptions);

      for (const seeker of seekers) {
        const updateData = {
          hr_evaluation: seeker.hr_evaluation,
          send_for_evaluation: seeker.send_for_evaluation,
          send_invitation: seeker.send_invitation
        };

        try {
          await appliedDto.update(seeker.appliedId, updateData);
          console.log(`Updated for seeker_id: ${seeker.seeker_id}`);
        } catch (updateError) {
          console.error(`Failed to update for seeker_id: ${seeker.seeker_id}`, updateError);
        }
      }

      console.log('Invitation email sent:', mailOptions);
      return result;
    } catch (error) {
      console.error('Error sending invitation email:', error.message);
      console.error('Detailed error info:', error);
      throw new Error('Failed to send invitation email.');
    }
  }

  async sendEvaluationEmail(data) {
    const { seekers, emails } = data;  // Assume seekers contain the data you want to update
    console.log(data);

    try {
      for (const seeker of seekers) {
        const mailOptions = {
          from: `${data.company_email}`,
          to: emails.join(','),  // Send each email individually
          subject: 'Evaluation Request',
          text: `Please evaluate the candidate: ${seeker.name} by clicking the link below.`,
          html: `<p>Please evaluate the candidate: ${seeker.name} by clicking the link below.</p>
               <br><a href="http://localhost:5173/evaluation/${data.job_id}">Evaluate Candidate</a>`,
        };

        console.log('Sending mail to:', seeker.email);
        console.log('Mail options:', mailOptions);

        try {
          const result = await this.transporter.sendMail(mailOptions);
          console.log(`Email sent successfully to ${seeker.email}`);

          // Update applied status
          const updateData = {
            hr_evaluation: seeker.hr_evaluation,
            send_for_evaluation: seeker.send_for_evaluation,
            send_invitation: seeker.send_invitation || false,
          };

          try {
            await appliedDto.update(seeker.appliedId, updateData);
            console.log(`Updated for appliedId: ${seeker.appliedId}`);
          } catch (updateError) {
            console.error(`Failed to update for appliedId: ${seeker.appliedId}`, updateError);
          }
        } catch (mailError) {
          console.error(`Failed to send email to ${seeker.email}`, mailError);
        }
      }

      console.log('All evaluation emails processed successfully.');
      return { success: true, message: 'Emails sent to evaluation.' };
    } catch (error) {
      console.error('Error in sendEvaluationEmail:', error.message);
      throw new Error('Failed to send evaluation email.');
    }
  }


}

module.exports = new EmailService();
