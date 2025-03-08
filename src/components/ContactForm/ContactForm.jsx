import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, fetchContacts } from '../../redux/contactsSlice';
import styles from '../ContactForm/ContactForm.module.css';

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  useEffect(() => {
    dispatch(fetchContacts()); // Fetch contacts on mount
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const number = e.target.elements.number.value.trim();

    console.log('Submitting new contact:', name, number);
    console.log('Current contacts list:', contacts);

    if (!Array.isArray(contacts)) {
      console.error('Contacts is NOT an array!', contacts);
      return;
    }

    if (contacts.some(contact => contact.name === name)) {
      alert('This contact already exists!');
      return;
    }

    dispatch(addContact({ name, number }));

    e.target.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>Name</label>
      <input className={styles.input} type="text" name="name" required />

      <label className={styles.label}>Number</label>
      <input className={styles.input} type="tel" name="number" required />

      <button className={styles.button} type="submit">
        Add Contact
      </button>
    </form>
  );
}
