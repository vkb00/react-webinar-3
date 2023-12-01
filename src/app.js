import React, { useCallback, useState } from 'react';
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
  const totalBucketPrice = store.getState().totalBucketPrice;
  const countProductsInbucket = store.getState().countProductsInbucket;
  const [isModalOpen, setModalOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      console.log('del')
      store.deleteItem(code);
      store.sumCountProductsInBucket();
      store.sumBucketPrice();
    }, [store]),

    onAddToBucket: useCallback((item) => {
      store.addToBucket(item);
      store.sumCountProductsInBucket();
      store.sumBucketPrice();
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
      <Controls
        openModal={callbacks.openModal}
        totalBucketPrice={totalBucketPrice}
        countProductsInbucket={countProductsInbucket} />

      <List list={list}
        isDelete={false}
        onAddToBucket={callbacks.onAddToBucket}
      />

    </PageLayout>
  );
}

export default App;
