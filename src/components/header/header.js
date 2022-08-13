import React from 'react';
import './header.css';

import { Button } from '../button/button';

export const Header = ({ saveStatus }) => {
  const loadingStatus = ['saving', 'removing'];
  const isLoading = loadingStatus.includes(saveStatus);

  const errorStatus = ['save_failed', 'remove_failed'];
  const hasError = errorStatus.includes(saveStatus);

  return (
    <div className="nodraft-header">
      <div className="save-status">
        <div className="saveBlock">
          {chrome.i18n.getMessage(`heading_${saveStatus}`)}
        </div>
      </div>

      {!hasError && saveStatus !== 'removed' ? (
        <Button type="inline" onClick={removeAction}>
          {chrome.i18n.getMessage('buttons_remove')}
        </Button>
      ) : null}
      {saveStatus === 'removed' ? (
        <Button type="inline" onClick={saveAction}>
          {chrome.i18n.getMessage('buttons_save')}
        </Button>
      ) : null}
    </div>
  );
};
