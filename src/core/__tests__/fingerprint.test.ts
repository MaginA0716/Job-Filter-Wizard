import fs from 'fs';
import path from 'path';
import { FingerprintManager } from '../fingerprint';

const TEST_STORAGE_PATH = 'test_seen_jobs.json';

describe('FingerprintManager', () => {
  let manager: FingerprintManager;

  beforeEach(() => {
    // 确保测试前没有旧数据
    if (fs.existsSync(TEST_STORAGE_PATH)) {
      fs.unlinkSync(TEST_STORAGE_PATH);
    }
    manager = new FingerprintManager(TEST_STORAGE_PATH);
  });

  afterAll(() => {
    // 清理测试文件
    if (fs.existsSync(TEST_STORAGE_PATH)) {
      fs.unlinkSync(TEST_STORAGE_PATH);
    }
  });

  test('首次见到指纹应返回 false 并记录', () => {
    const fp = 'Company-Title-Location';
    expect(manager.isSeen(fp)).toBe(false);
    manager.addFingerprint(fp);
    expect(manager.isSeen(fp)).toBe(true);
  });

  test('指纹应持久化到文件', () => {
    const fp = 'Persistence-Test';
    manager.addFingerprint(fp);
    
    // 创建一个新的实例加载相同文件
    const anotherManager = new FingerprintManager(TEST_STORAGE_PATH);
    expect(anotherManager.isSeen(fp)).toBe(true);
  });

  test('过期的指纹应被清理并返回 false', () => {
    const fp = 'Expired-Test';
    manager.addFingerprint(fp);

    // 模拟过期：手动修改内部数据
    // 注意：这只是为了演示，生产代码中 TTL 是 30 天
    const now = Date.now() / 1000;
    const expiredTime = now - (31 * 24 * 60 * 60); // 31天前
    
    const data = JSON.parse(fs.readFileSync(TEST_STORAGE_PATH, 'utf-8'));
    data[fp] = expiredTime;
    fs.writeFileSync(TEST_STORAGE_PATH, JSON.stringify(data));

    // 重新加载数据
    const expiredManager = new FingerprintManager(TEST_STORAGE_PATH);
    expect(expiredManager.isSeen(fp)).toBe(false);
  });
});
