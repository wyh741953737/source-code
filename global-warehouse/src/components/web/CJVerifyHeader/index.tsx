import React from 'react';
import styles from './styles';

interface WProps {}

export default (props: WProps) => {
  const {} = props;
  return (
    <div className={styles.verifyEmail}>
      Hey 960523935@qq.com, to make sure your account security, please verify
      your email address here.&nbsp;
      <a
        href="https://cjdropshipping.com/verify_email.html?target=aHR0cHM6Ly9jamRyb3BzaGlwcGluZy5jb20vaG9tZS5odG1s"
        target="_blank"
        rel="noreferrer"
      >
        Verify Email
      </a>
    </div>
  );
};
