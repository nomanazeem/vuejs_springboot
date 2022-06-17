CREATE TABLE `todo` (
  `id_todo` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_todo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


insert into todo(name, status) values ('Test todo 1', 'Active');