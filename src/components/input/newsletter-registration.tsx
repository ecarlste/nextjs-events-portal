import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import { FormEvent } from 'react';
import NotificationContext from '@/store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;

    notificationCtx?.showNotification({
      title: 'Signing up...',
      message: 'message',
      status: 'pending',
    });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: enteredEmail }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
    } catch (error: any) {
      notificationCtx?.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      });
    }

    notificationCtx?.showNotification({
      title: 'Success!',
      message: 'Successfully registered for newsletter!',
      status: 'success',
    });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
