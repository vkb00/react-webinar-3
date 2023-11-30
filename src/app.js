import React, { useCallback, useEffect, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const bucketSpace = store.getState().bucketSpace;
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalBucketPrice, setTotalBucketPrice] = useState(0);
  const callbacks = {
    onDeleteItem: useCallback((code) => {
      console.log('del')
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToBucket: useCallback((item) => {
      store.addToBucket(item);
    }, [store]),
    getBucketInfo: useCallback(() => {
      return store.getState().bucketSpace;
    }, [store]),
    openModal: () => {
      setModalOpen(true);
    },

    closeModal: () => {
      setModalOpen(false);
    },


  }

  return (
    <PageLayout>
      <Modal isOpen={isModalOpen} onClose={callbacks.closeModal} totalBucketPrice={totalBucketPrice}>
        <List list={bucketSpace}
          isDelete={true}
          onDeleteItem={callbacks.onDeleteItem}
        />
      </Modal>
      <Head title='Магазин' />
      <Controls bucketSpace={bucketSpace} openModal={callbacks.openModal} />

      <List list={list}
        isDelete={false}
        onAddToBucket={callbacks.onAddToBucket} />
    </PageLayout>
  );
}

export default App;
