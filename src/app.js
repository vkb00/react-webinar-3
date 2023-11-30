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
  const totalBucketPrice = store.getState().totalBucketPrice;
  const countProductsInbucket = store.getState().countProductsInbucket;
  const [isModalOpen, setModalOpen] = useState(false);
  // const [totalBucketPrice, setTotalBucketPrice] = useState(0);
  const callbacks = {
    onDeleteItem: useCallback((code) => {
      console.log('del')

      store.deleteItem(code);
      store.sumCountProductsInBucket();
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToBucket: useCallback((item) => {
      //store.sumCountProductsInBucket();
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
    sumBucketPrice: useCallback(() => {
      store.sumBucketPrice();
    }, [store]),
    sumCountProductsInBucket: useCallback(() => {
      store.sumCountProductsInBucket();
    }, [store])


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
      <Controls bucketSpace={bucketSpace}
        openModal={callbacks.openModal}
        sumBucket={callbacks.sumBucketPrice}
        totalBucketPrice={totalBucketPrice}
        countProductsInbucket={countProductsInbucket}
        sumCountProductsInBucket={callbacks.sumCountProductsInBucket}
      />

      <List list={list}
        isDelete={false}
        onAddToBucket={callbacks.onAddToBucket}
      />

    </PageLayout>
  );
}

export default App;
