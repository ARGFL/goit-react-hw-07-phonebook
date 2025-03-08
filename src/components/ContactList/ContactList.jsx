import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from '../../redux/contactsSlice';
import styles from '../ContactList/ContactList.module.css';

export function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items); // ✅ FIXED
  const filter = useSelector(state => state.filter);

  // ✅ Fetch contacts when the component mounts
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // ✅ Filter contacts based on search input
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // ✅ Show a message if no contacts are found
  if (filteredContacts.length === 0) {
    return <p className={styles.noContacts}>No contacts found.</p>;
  }

  return (
    <ul className={styles.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={styles.listItem}>
          <span>
            {name}: {number}
          </span>
          <button
            className={styles.deleteButton}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
