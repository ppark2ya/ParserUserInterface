import React, { PureComponent } from 'react';
import { ServiceItem } from '../ServiceItem';

const serviceList = [
    { name: 'checkserver', title: 'Check Server', description: '웹 사이트를 모니터링하고 호스트, DNS 레코드, IP 주소를 확인할 수 있는 온라인 도구' },
    { name: 'sefilcare', title: 'SefilCare', description: '시맨틱스 자체 서비스' },
    { name: 'zabbix', title: 'Zabbix', description: '네트워크 하드웨어를 감시, 추적해 관리자에게 장애 발생을 신속히 알리는 네트워크 관리 시스템' },
    { name: 'postman', title: 'Postman', description: '개발한 API를 테스트하고 그 결과를 공유해 API 개발의 생산성을 높여주는 REST API 테스트용 프로그램' },
];

const style = {
    width: '95%',
    height: '80%',
    margin: '0 auto',
    marginTop: '20px',
};

class ServiceList extends PureComponent {
    render() {
        const { handleChange, zabbix, postman, sefilcare, checkserver } = this.props;
        const serviceComponents = serviceList.map(
            (service, idx) => (
                <ServiceItem
                    key={idx}
                    title={service.title}
                    name={service.name}
                    checked={
                        service.name === 'checkserver' ? checkserver :
                        service.name === 'sefilcare' ? sefilcare :
                        service.name === 'zabbix' ? zabbix :
                        service.name === 'postman' ? postman : false
                    }
                    desc={service.description}
                    onChange={handleChange}
                />
            )
        );

        return (
            <div style={style}>
                {serviceComponents}
            </div>
        );
    }
}

export default ServiceList;