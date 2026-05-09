import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import IconGenerator from './pages/IconGenerator';
import MasterData from './pages/MasterData';
import type { MasterDataItem, Page } from './types';
import { loadMasterData, saveMasterData } from './lib/storage';

export default function App() {
  const [page, setPage] = useState<Page>('generator');
  const [masterData, setMasterData] = useState<MasterDataItem[]>(() => loadMasterData());

  useEffect(() => {
    saveMasterData(masterData);
  }, [masterData]);

  return (
    <div className="h-screen w-screen flex bg-slate-50 text-slate-800">
      <Sidebar page={page} onChange={setPage} />
      <main className="flex-1 overflow-hidden">
        {page === 'generator' && (
          <IconGenerator masterData={masterData} />
        )}
        {page === 'master' && (
          <MasterData masterData={masterData} setMasterData={setMasterData} />
        )}
      </main>
    </div>
  );
}
